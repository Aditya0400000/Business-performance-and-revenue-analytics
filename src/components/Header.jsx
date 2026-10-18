import { NOW } from '../data/mockData'
const iso = (t) => new Date(t).toISOString().slice(0, 10)
const PRESETS = [
  ['Today', 1],
  ['Last 7 Days', 7],
  ['Last 30 Days', 30],
  ['Custom', 0],
]
const dateCls = 'rounded-lg bg-white/10 px-2 py-1.5 text-sm text-white [color-scheme:dark]'

export default function Header({ preset, setPreset, cf, setCf, ct, setCt }) {
  return (
    <header className="-mx-5 mb-6 flex flex-col gap-3 bg-ink px-5 py-4 text-white md:sticky md:top-0 md:z-40 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-lg font-extrabold sm:text-xl">
          Business Performance & Revenue Analytics
        </h1>
        <p className="text-xs text-mist">
          Leads, quotations, deals, orders and payments in one view
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map(([l, v]) => (
          <button
            key={l}
            onClick={() => setPreset(v)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${preset === v ? 'bg-gold text-ink' : 'bg-white/10 hover:bg-white/20'}`}
          >
            {l}
          </button>
        ))}
        {!preset && (
          <>
            <input
              type="date"
              value={cf}
              max={ct}
              onChange={(e) => setCf(e.target.value)}
              className={dateCls}
            />
            <input
              type="date"
              value={ct}
              min={cf}
              max={iso(NOW)}
              onChange={(e) => setCt(e.target.value)}
              className={dateCls}
            />
          </>
        )}
      </div>
    </header>
  )
}
