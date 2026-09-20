/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Editorial display face — headlines, prices, numerals
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Body face — everything readable
        sans: ['"Instrument Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* ── Sistema Marimar (tokens semánticos) ── */
        paper: {
          DEFAULT: "hsl(var(--paper))",        // fondo cálido de la página
          raised: "hsl(var(--paper-raised))",  // tarjetas / superficies
          sunken: "hsl(var(--paper-sunken))",  // paneles hundidos
        },
        vitrina: "hsl(var(--vitrina))",        // fondo de las fotos de producto
        ink: {
          DEFAULT: "hsl(var(--ink))",          // texto principal
          soft: "hsl(var(--ink-soft))",        // texto secundario
          muted: "hsl(var(--ink-muted))",      // texto terciario (AA en paper)
        },
        line: {
          DEFAULT: "hsl(var(--line))",         // hairline
          strong: "hsl(var(--line-strong))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",        // naranja de marca (fondos/iconos)
          deep: "hsl(var(--brand-deep))",      // hover de fondos
          ink: "hsl(var(--brand-ink))",        // naranja legible sobre claro (AA)
          tint: "hsl(var(--brand-tint))",      // tinte suave
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",         // oro del emblema (aros, reglas, texto sobre oscuro)
          deep: "hsl(var(--gold-deep))",       // oro en sombra
          ink: "hsl(var(--gold-ink))",         // oro legible sobre papel (AA)
        },
        ember: "hsl(var(--ember))",            // brasa — cierre del barrido
        espresso: {
          DEFAULT: "hsl(var(--espresso))",     // secciones oscuras
          raised: "hsl(var(--espresso-raised))",
        },
        leaf: "hsl(var(--leaf))",              // WhatsApp / éxito

        /* ── Compatibilidad shadcn/ui ── */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      fontSize: {
        // Escala editorial fluida
        'display-xl': ['clamp(2.6rem, 1.4rem + 4.6vw, 5rem)', { lineHeight: '0.96', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.25rem, 1.4rem + 3.6vw, 3.75rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.375rem, 1.1rem + 1.1vw, 1.875rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'eyebrow': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.22em' }],
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        // Sombras cálidas — nunca gris neutro sobre papel cálido
        'card': '0 1px 2px hsl(24 30% 12% / 0.04), 0 8px 24px -12px hsl(24 40% 12% / 0.12)',
        'card-hover': '0 2px 4px hsl(24 30% 12% / 0.05), 0 24px 48px -20px hsl(24 55% 20% / 0.28)',
        'lift': '0 32px 64px -32px hsl(24 60% 14% / 0.45)',
        'brand': '0 12px 32px -12px hsl(var(--brand) / 0.55)',
        // Halo del emblema sobre superficies oscuras
        'emblem': '0 0 0 1px hsl(var(--gold) / 0.28), 0 18px 44px -18px hsl(var(--brand) / 0.55)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.4, 0.64, 1)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        'slide-in': 'slideInLeft 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-up': 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scaleIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) both',
        'float': 'float 7s ease-in-out infinite',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
