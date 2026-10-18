import { pct } from '../utils/analytics'
export const PAL = ['#0e7c86', '#c8a24a', '#11162b', '#d6455d', '#7c8db5', '#5baa8f']
export const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')
export const Card = ({ title, children, className = '', right }) => (
  <section
    className={`min-w-0 rounded-2xl bg-white p-4 sm:p-5 shadow-[0_1px_2px_rgba(17,22,43,.06),0_8px_24px_-12px_rgba(17,22,43,.12)] ${className}`}
  >
    {title && (
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold">{title}</h3>
        {right}
      </div>
    )}
    {children}
  </section>
)
export const Delta = ({ cur, prev, label = 'vs previous period' }) => {
  const d = pct(cur, prev)
  return (
    <p className={`mt-2 text-xs font-semibold ${d >= 0 ? 'text-teal' : 'text-rose'}`}>
      {d >= 0 ? '▲' : '▼'} {Math.abs(d).toFixed(1)}%{' '}
      <span className="font-medium text-mist">{label}</span>
    </p>
  )
}
export const Kpi = ({ label, value, cur, prev, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="min-w-0 rounded-2xl bg-white p-4 text-left shadow-[0_1px_2px_rgba(17,22,43,.06),0_8px_24px_-12px_rgba(17,22,43,.12)] ring-2 ring-transparent transition hover:-translate-y-0.5 hover:ring-gold/70 focus-visible:ring-gold"
  >
    <p className="text-xs font-semibold text-mist">{label}</p>
    <p className="font-display mt-2 break-words text-xl font-extrabold sm:text-2xl">{value}</p>
    <Delta cur={cur} prev={prev} label="vs prev." />
  </button>
)
export const Section = ({ id, title, children }) => (
  <div id={id}>
    <h2 className="mb-3 mt-8 text-lg font-extrabold">{title}</h2>
    {children}
  </div>
)
export const Modal = ({ title, onClose, children }) => (
  <div
    className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-ink/60 p-4 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="mt-4 w-full max-w-3xl rounded-2xl bg-white p-4 sm:mt-10 sm:p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-4 flex justify-between">
        <h3 className="text-lg font-extrabold">{title}</h3>
        <button
          onClick={onClose}
          className="rounded-lg px-3 py-1 text-sm font-semibold hover:bg-canvas"
        >
          Close
        </button>
      </div>
      {children}
    </div>
  </div>
)
export const Pill = ({ children }) => (
  <span className="rounded-full bg-canvas px-2.5 py-0.5 text-xs font-semibold">{children}</span>
)

import { ResponsiveContainer } from 'recharts'
export const ax = { tick: { fontSize: 11, fill: '#7c8db5' }, axisLine: false, tickLine: false }
export const C = ({ h = 240, children }) => (
  <ResponsiveContainer width="100%" height={h}>
    {children}
  </ResponsiveContainer>
)
export const Th = ({ children }) => (
  <th className="py-2 pr-3 text-left text-xs font-semibold text-mist">{children}</th>
)
export const Td = ({ children, ...p }) => (
  <td className="py-2 pr-3 text-sm" {...p}>
    {children}
  </td>
)
export const axRot = {
  ...ax,
  interval: 0,
  angle: -35,
  textAnchor: 'end',
  height: 70,
  tick: { fontSize: 10, fill: '#7c8db5' },
}
