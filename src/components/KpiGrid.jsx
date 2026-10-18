import { Kpi, inr } from './ui'

export default function KpiGrid({ m, go }) {
  const { cur, prev } = m
  const items = [
    ['Total Leads', cur.L.length, cur.L.length, prev.L.length, 'lead-explorer', 'All'],
    ['Qualified', cur.qual, cur.qual, prev.qual, 'lead-explorer', 'Qualified'],
    ['Converted', cur.conv, cur.conv, prev.conv, 'lead-explorer', 'Converted'],
    ['Unqualified', cur.unq, cur.unq, prev.unq, 'lead-explorer', 'Unqualified'],
    ['Conversion Rate', cur.rate.toFixed(1) + '%', cur.rate, prev.rate, 'lead-analytics'],
    ['Quotations', cur.Q.length, cur.Q.length, prev.Q.length, 'quotation-analytics'],
    ['Deals', cur.D.length, cur.D.length, prev.D.length, 'deals-revenue'],
    ['Revenue', inr(cur.value), cur.value, prev.value, 'deals-revenue'],
  ]
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 2xl:grid-cols-8">
      {items.map(([label, value, c, p, target, st]) => (
        <Kpi
          key={label}
          label={label}
          value={value}
          cur={c}
          prev={p}
          onClick={() => go(target, st)}
        />
      ))}
    </div>
  )
}
