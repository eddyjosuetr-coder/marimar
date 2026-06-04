const IMAGES = [
  '671844993_18461602582110869_6710465230602622749_n.jpg',
  '671845523_18461951875110869_5302522036810512216_n.jpg',
  '682471401_18459274621110869_4298490481785690450_n.jpg',
  '682860702_18459325156110869_8019775258036823670_n.jpg',
  '683661564_18460134619110869_4768245013598560896_n.jpg',
  '683786922_18459964192110869_1190034906563171963_n.jpg',
  '684533647_18460506052110869_5358569229091753940_n.jpg',
  '684906961_18460526965110869_6019376074122144210_n.jpg',
  '684917304_18459990019110869_6484966905256790079_n.jpg',
  '684991786_18460318339110869_4624012956973893490_n.jpg',
  '685074754_18460697458110869_5333522526384436070_n.jpg',
  '685920592_18460542412110869_8212404921830297245_n.jpg',
  '686014166_18460494688110869_6283311869301120619_n.jpg',
  '686499471_2044003943140220_4364310977452665885_n.jpg',
  '687383089_18460675456110869_8903175348192986421_n.jpg',
  '688491946_18461432668110869_392537866545572383_n.jpg',
  '688550721_18460341406110869_2171627171586909668_n.jpg',
  '689175859_18461251729110869_821917846461587707_n.jpg',
  '691610057_18461235253110869_1873403281163337577_n.jpg',
  '691725975_18460685599110869_6186411382342072833_n.jpg',
  '693467980_18461611012110869_8795596541916472518_n.jpg',
  '694718454_18461712979110869_6841937532158170101_n.jpg',
  '694998155_18461722534110869_9205560448462331817_n.jpg',
  '695700500_18461893402110869_5846825290732858421_n.jpg',
  '695764936_18461395801110869_2170466073623169538_n.jpg',
  '695789469_18461404810110869_1598529478937273336_n.jpg',
  '695825685_18461893393110869_782984731016274857_n.jpg',
  '696032702_18461542315110869_8420462808766812682_n.jpg',
  '696148644_18461719456110869_5507262291380477489_n.jpg',
  '696233313_18460667083110869_4562593229784850769_n.jpg',
  '696292559_18461764843110869_8015502896059652454_n.jpg',
  '696529950_18461397139110869_1607117010209338728_n.jpg',
  '696557492_18461407297110869_3400169030780168762_n.jpg',
  '697130835_18461560642110869_5450012263007499250_n.jpg',
  '698396808_18461419204110869_6308158681437631846_n.jpg',
]

/* Duplicate for seamless infinite loop */
const TRACK1 = [...IMAGES, ...IMAGES]
const TRACK2 = [...[...IMAGES].reverse(), ...[...IMAGES].reverse()]

const IG_LINK = 'https://www.instagram.com/marimarmilenium/'

function Track({ images, direction }: { images: string[]; direction: 'left' | 'right' }) {
  const anim = direction === 'left'
    ? 'marqueeLeft 55s linear infinite'
    : 'marqueeRight 70s linear infinite'

  return (
    <div className="overflow-hidden relative" style={{ maskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)' }}>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          width: 'max-content',
          animation: anim,
          willChange: 'transform',
        }}
      >
        {images.map((file, i) => (
          <a
            key={i}
            href={IG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 overflow-hidden rounded-2xl relative group"
            style={{ width: '200px', height: '200px' }}
          >
            <img
              src={`/instagram/${file}`}
              alt="Marimar Milenium Instagram"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
              className="group-hover:scale-110"
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              style={{ background: 'rgba(0,0,0,0.35)' }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <defs>
                  <radialGradient id={`ig-hover-${i}`} cx="30%" cy="107%" r="150%">
                    <stop offset="0%" stopColor="#fdf497" />
                    <stop offset="45%" stopColor="#fd5949" />
                    <stop offset="70%" stopColor="#d6249f" />
                    <stop offset="100%" stopColor="#285AEB" />
                  </radialGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="5.5" fill={`url(#ig-hover-${i})`} />
                <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export function InstagramGallery() {
  return (
    <section style={{ background: '#0a0a0a', padding: '72px 0 60px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px', padding: '0 24px' }}>
        <a
          href={IG_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}
          className="group"
        >
          {/* Instagram icon */}
          <div
            style={{
              width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
              background: 'linear-gradient(135deg, #fdf497 0%, #fd5949 40%, #d6249f 65%, #285AEB 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(214,36,159,0.35)',
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="white" strokeWidth="1.8" fill="none" />
              <circle cx="12" cy="12" r="4.3" stroke="white" strokeWidth="1.8" fill="none" />
              <circle cx="17.3" cy="6.7" r="1.1" fill="white" />
            </svg>
          </div>

          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: '3px' }}>
              Síguenos en
            </p>
            <p
              style={{
                fontSize: '26px', fontWeight: 900, lineHeight: 1,
                background: 'linear-gradient(90deg, #fd5949, #d6249f, #285AEB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              className="group-hover:opacity-75 transition-opacity"
            >
              @marimarmilenium
            </p>
          </div>

          <div
            style={{
              width: '32px', height: '32px', borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            className="group-hover:border-[#d6249f] transition-colors"
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2.5">
              <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </a>

        <p style={{ color: '#555', fontSize: '14px', marginTop: '12px', maxWidth: '380px', margin: '12px auto 0' }}>
          Nuestras últimas novedades, productos y promociones exclusivas
        </p>
      </div>

      {/* Track 1 — izquierda */}
      <div style={{ marginBottom: '12px' }}>
        <Track images={TRACK1} direction="left" />
      </div>

      {/* Track 2 — derecha */}
      <Track images={TRACK2} direction="right" />

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: '44px' }}>
        <a
          href={IG_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            color: 'white', fontWeight: 700, fontSize: '14px',
            padding: '14px 32px', borderRadius: '100px',
            background: 'linear-gradient(135deg, #fd5949, #d6249f, #285AEB)',
            boxShadow: '0 8px 32px rgba(214,36,159,0.35)',
            textDecoration: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          className="hover:scale-105 active:scale-95"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="white" strokeWidth="1.8" fill="none" />
            <circle cx="12" cy="12" r="4.3" stroke="white" strokeWidth="1.8" fill="none" />
            <circle cx="17.3" cy="6.7" r="1.1" fill="white" />
          </svg>
          Ver perfil completo
        </a>
      </div>
    </section>
  )
}
