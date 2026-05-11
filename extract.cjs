const fs = require('fs');

const appTsx = fs.readFileSync('src/App.tsx', 'utf-8');

// Extract heroSlides
const heroSlidesMatch = appTsx.match(/const heroSlides:?.*?(?=\[)\[([\s\S]*?)\]\n\n/);
let heroSlides = heroSlidesMatch ? '[' + heroSlidesMatch[1] + ']' : '[]';
if (!heroSlidesMatch) {
    const m = appTsx.match(/const heroSlides.*?= (\[[\s\S]*?\])/);
    heroSlides = m ? m[1] : '[]';
}

// Extract baseProducts
let baseProducts = '[]';
const bpMatch = appTsx.match(/const baseProducts:?.*?= \[([\s\S]*?^\])/m);
if (bpMatch) {
    baseProducts = '[' + bpMatch[1];
} else {
    // try another matching strategy
    const startIndex = appTsx.indexOf('const baseProducts');
    if (startIndex !== -1) {
        const arrStart = appTsx.indexOf('[', startIndex);
        // find matching bracket
        let brackets = 1;
        let arrEnd = -1;
        for (let i = arrStart + 1; i < appTsx.length; i++) {
            if (appTsx[i] === '[') brackets++;
            if (appTsx[i] === ']') brackets--;
            if (brackets === 0) {
                arrEnd = i;
                break;
            }
        }
        if (arrEnd !== -1) {
            baseProducts = appTsx.substring(arrStart, arrEnd + 1);
        }
    }
}

// Extract promos
let promos = '[]';
const pMatch = appTsx.match(/const promos:?.*?= (\[[\s\S]*?\])/);
if (pMatch) {
    promos = pMatch[1];
} else {
    const startIndex = appTsx.indexOf('const promos');
    if (startIndex !== -1) {
        const arrStart = appTsx.indexOf('[', startIndex);
        let brackets = 1;
        let arrEnd = -1;
        for (let i = arrStart + 1; i < appTsx.length; i++) {
            if (appTsx[i] === '[') brackets++;
            if (appTsx[i] === ']') brackets--;
            if (brackets === 0) {
                arrEnd = i;
                break;
            }
        }
        if (arrEnd !== -1) {
            promos = appTsx.substring(arrStart, arrEnd + 1);
        }
    }
}


const preciosTsv = fs.readFileSync('precios', 'utf-8');
const lines = preciosTsv.split('\n').filter(l => l.trim().length > 0);

const catalogProducts = [];
let idCounter = 1000;

// Calculate averages for 'Oferta'
const categoriesPrices = {};

lines.forEach(line => {
    const cols = line.split('\t');
    if (cols.length >= 6) {
        const cat = cols[0].trim();
        const priceStr = cols[4].trim().replace(',', '.');
        const price = parseFloat(priceStr);
        if (!isNaN(price) && price > 0) {
            if (!categoriesPrices[cat]) categoriesPrices[cat] = [];
            categoriesPrices[cat].push(price);
        }
    }
});

const categoryAverages = {};
for (const cat in categoriesPrices) {
    const prices = categoriesPrices[cat];
    categoryAverages[cat] = prices.reduce((a, b) => a + b, 0) / prices.length;
}

lines.forEach(line => {
    const cols = line.split('\t');
    if (cols.length >= 6) {
        const category = cols[0].trim();
        const code = cols[1].trim();
        const name = cols[2].trim();
        const presentationStr = cols[3].trim();
        let priceStr = cols[4].trim().replace(',', '.');
        let price = parseFloat(priceStr);
        if (isNaN(price)) price = 0;
        const status = cols[5].trim();

        // Infer brand
        let brand = category; // fallback
        const knownBrands = ['Fritz', 'La Viña', 'Coma', 'Heinz', 'Deli', 'Paraíso', 'OBA', 'La Ideal', 'Venato', 'Tomatico', 'Mayotropi', 'Da Gusto', 'McCormick', 'Sweet Baby Ray\'s', 'Mados', 'Zedeño', 'Montesano', 'Don Ramon', 'Ahulux', 'Cumbre Fresca', 'Milenium', 'Bompack', 'Envofresh', 'Dispaq', 'Encfoil', 'Brilux', 'Kraft', 'Mavesa', 'Alimentos Polar'];
        for (const b of knownBrands) {
            if (name.toLowerCase().includes(b.toLowerCase())) {
                brand = b;
                break;
            }
        }

        let badge = undefined;
        if (name.toLowerCase().includes('nuevo')) {
            badge = 'Nuevo';
        } else if (categoryAverages[category] && price < categoryAverages[category] * 0.3) {
            badge = 'Oferta';
        }

        catalogProducts.push({
            id: idCounter++,
            image: '',
            brand: brand,
            name: `${name} - ${presentationStr}`,
            price: price,
            category: category,
            badge: badge
        });
    }
});

const out = `import type { Product, Promo, HeroSlide } from '@/types';

export const heroSlides: HeroSlide[] = ${heroSlides};

export const promos: Promo[] = ${promos};

export const baseProducts: Product[] = ${baseProducts};

export const catalogProducts: Product[] = ${JSON.stringify(catalogProducts, null, 2)};

export const products: Product[] = [...baseProducts, ...catalogProducts];

export const PER_PAGE = 24;

export const CATEGORIES = ['Todos', ...Array.from(new Set(products.map(p => p.category)))].sort();
`;

fs.writeFileSync('src/data/products.ts', out);
console.log('Successfully generated src/data/products.ts');
console.log('Parsed base products:', baseProducts.length);
