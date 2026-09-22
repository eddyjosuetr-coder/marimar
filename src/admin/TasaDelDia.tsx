import { useState } from 'react'
import { RefreshCw, Calculator, Check } from 'lucide-react'
import { useTasa } from '@/hooks/useTasa'
import {
  aBolivares, consultarBCV, fijarTasaManual, formatBs, formatTasa,
  quitarTasaManual, tasaBCVConocida, tasaManualGuardada,
} from '@/lib/tasa'
import { formatAmount, cn } from '@/lib/utils'
import { parsearPrecio } from './precio'

/**
 * La tasa del día en el panel del dueño.
 *
 * La tienda trae sola la tasa oficial del BCV cada día, así que lo normal es
 * no tocar nada. La casilla manual está para los días en que el dueño
 * necesita otra cifra: si el BCV no respondió, si maneja una tasa propia, o
 * si quiere probar cuánto quedaría el catálogo antes de decidir.
 *
 * La calculadora de abajo existe porque es la cuenta que se hace veinte
 * veces al día en el mostrador, de dólar a bolívar y al revés.
 */

const CAMPO =
  'w-full h-11 px-3.5 rounded-lg bg-paper border border-line text-[15px] text-ink tabular-nums ' +
  'outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-all placeholder:text-ink-muted'

export function TasaDelDia() {
  const tasa = useTasa()
  const oficial = tasaBCVConocida()
  const propia = tasaManualGuardada()

  const [manual, setManual] = useState('')
  const [error, setError] = useState('')
  const [consultando, setConsultando] = useState(false)
  const [guardada, setGuardada] = useState(false)

  const aplicarManual = () => {
    const valor = parsearPrecio(manual)
    if (valor === null) {
      setError('Escribe la tasa, por ejemplo 849,56')
      return
    }
    fijarTasaManual(valor)
    setManual('')
    setError('')
    setGuardada(true)
    window.setTimeout(() => setGuardada(false), 2000)
  }

  const traerDelBCV = async () => {
    setConsultando(true)
    const valor = await consultarBCV()
    setConsultando(false)
    if (valor === null) {
      setError('El BCV no respondió. Escribe la tasa a mano.')
      return
    }
    setManual(formatTasa(valor).replace('.', ''))
    setError('')
  }

  return (
    <section className="mb-8 rounded-xl border border-line bg-paper-raised p-4 md:p-5">
      <div className="mb-4">
        <h2 className="font-display text-[18px] font-extrabold text-ink">Tasa del día</h2>
        <p className="text-[13px] text-ink-soft mt-1.5 max-w-[62ch] leading-relaxed">
          De lunes a viernes la tienda toma sola la tasa del BCV. El sábado,
          antes de abrir, escribe aquí la tuya: manda todo el fin de semana y
          el lunes la tienda vuelve sola a la oficial, sin que tengas que
          acordarte de quitarla.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className={cn(
          'p-4 rounded-xl border',
          tasa.origen === 'manual' ? 'border-brand/45 bg-brand-tint/40' : 'border-line bg-paper'
        )}>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted mb-1">
            Vigente en la tienda
          </p>
          <p className="font-display text-[28px] font-extrabold text-ink leading-none tabular-nums">
            {tasa.valor === null ? '—' : `Bs ${formatTasa(tasa.valor)}`}
          </p>
          <p className="text-[12px] text-ink-soft mt-1.5">
            {tasa.origen === 'manual' && `La tuya, del ${tasa.fecha ?? 'hoy'} · manda hasta que el BCV publique una más nueva`}
            {tasa.origen === 'bcv' && 'Oficial del BCV, de hoy'}
            {tasa.origen === 'guardada' && `Última conocida${tasa.fecha ? ` (${tasa.fecha})` : ''}`}
            {tasa.origen === 'respaldo' && 'De respaldo: todavía no se pudo consultar al BCV'}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-line bg-paper">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted mb-1">
            Oficial del BCV
          </p>
          <p className="font-display text-[28px] font-extrabold text-ink-soft leading-none tabular-nums">
            {oficial ? `Bs ${formatTasa(oficial.valor)}` : '—'}
          </p>
          <p className="text-[12px] text-ink-soft mt-1.5">
            {oficial?.fecha ? `Del ${oficial.fecha}` : 'Todavía no se ha podido consultar'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-2.5">
        <div className="flex-1 min-w-[180px]">
          <label htmlFor="tasa-manual" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted mb-1.5">
            Poner otra tasa
          </label>
          <input
            id="tasa-manual"
            inputMode="decimal"
            value={manual}
            onChange={e => { setManual(e.target.value); setError('') }}
            onKeyDown={e => { if (e.key === 'Enter') aplicarManual() }}
            placeholder={oficial ? formatTasa(oficial.valor) : '849,56'}
            className={CAMPO}
          />
        </div>

        <button
          type="button"
          onClick={aplicarManual}
          className="h-11 px-4 rounded-lg bg-brand text-white text-[14px] font-semibold hover:bg-brand-deep transition-colors"
        >
          {guardada ? <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4" strokeWidth={3} />Guardada</span> : 'Aplicar'}
        </button>

        <button
          type="button"
          onClick={traerDelBCV}
          disabled={consultando}
          className="h-11 px-4 rounded-lg border border-line text-[14px] font-semibold text-ink-soft hover:text-ink hover:border-ink/35 disabled:opacity-50 transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw className={cn('w-4 h-4', consultando && 'animate-spin')} strokeWidth={2.4} />
          Traer la del BCV
        </button>

        {tasa.origen === 'manual' && (
          <button
            type="button"
            onClick={() => quitarTasaManual()}
            className="h-11 px-3 text-[13px] font-semibold text-ink-muted hover:text-destructive transition-colors"
          >
            Volver a la del BCV
          </button>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-2 text-[12.5px] font-semibold text-destructive">{error}</p>
      )}

      {/* Si venció, se dice: si no, el dueño creería que sigue vendiendo a la suya */}
      {propia && !propia.vigente && (
        <p className="mt-3 text-[12.5px] leading-relaxed text-ink-soft">
          Tu tasa del {propia.fecha} (Bs {formatTasa(propia.valor)}) ya venció:
          el BCV publicó una más nueva y la tienda volvió sola a la oficial.
        </p>
      )}

      {tasa.origen === 'manual' && (
        <p className="mt-3 p-3 rounded-lg bg-gold/10 border border-gold/40 text-[12.5px] leading-relaxed text-ink-soft">
          <strong className="text-ink">Ojo:</strong> esta tasa vive sólo en
          este equipo. Tus clientes siguen comprando a la del BCV hasta que
          conectemos el panel a internet.
        </p>
      )}

      <Calculadora tasa={tasa.valor} />
    </section>
  )
}

/** De dólar a bolívar y al revés: la cuenta del mostrador. */
function Calculadora({ tasa }: { tasa: number | null }) {
  const [dolares, setDolares] = useState('')
  const [bolivares, setBolivares] = useState('')

  if (tasa === null) return null

  const escribirDolares = (texto: string) => {
    setDolares(texto)
    const valor = parsearPrecio(texto)
    setBolivares(valor === null ? '' : formatBs(aBolivares(valor, tasa)))
  }

  const escribirBolivares = (texto: string) => {
    setBolivares(texto)
    const valor = parsearPrecio(texto.replace(/\./g, ''))
    setDolares(valor === null ? '' : formatAmount(valor / tasa))
  }

  return (
    <div className="mt-5 pt-5 border-t border-line">
      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted mb-2.5">
        <Calculator className="w-3.5 h-3.5" strokeWidth={2.4} />
        Calculadora
      </p>
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label htmlFor="calc-usd" className="block text-[11px] font-semibold text-ink-soft mb-1">Dólares</label>
          <input
            id="calc-usd"
            inputMode="decimal"
            value={dolares}
            onChange={e => escribirDolares(e.target.value)}
            placeholder="12,49"
            className={CAMPO}
          />
        </div>
        <span className="pb-3 text-ink-muted">=</span>
        <div className="flex-1">
          <label htmlFor="calc-bs" className="block text-[11px] font-semibold text-ink-soft mb-1">Bolívares</label>
          <input
            id="calc-bs"
            inputMode="decimal"
            value={bolivares}
            onChange={e => escribirBolivares(e.target.value)}
            placeholder="10.611,05"
            className={CAMPO}
          />
        </div>
      </div>
    </div>
  )
}
