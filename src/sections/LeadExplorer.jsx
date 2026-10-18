import { useMemo, useState } from 'react'
import { Card, Section, Pill, Th, Td, inr } from '../components/ui'
import { quotes, deals } from '../data/mockData'

const STATUSES = ['All', 'New', 'Qualified', 'Converted', 'Unqualified']
const match = (l, s) =>
  s === 'All' || l.status === s || (s === 'Qualified' && l.status === 'Converted')

export default function LeadExplorer({ m, setLead, status, setStatus }) {
  const [q, setQ] = useState('')
  const rows = useMemo(() => {
    const t = q.trim().toLowerCase()
    return m.cur.L.filter(
      (l) =>
        match(l, status) &&
        (!t || [l.id, l.name, l.status, l.source, l.owner].join(' ').toLowerCase().includes(t)),
    ).sort((a, b) => b.t - a.t)
  }, [m, q, status])

  return (
    <Section id="lead-explorer" title="Lead Explorer">
      <Card title={`Leads in selected period (${rows.length})`}>
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by ID, name, source or owner"
            className="w-full rounded-xl border border-canvas px-4 py-2 text-sm outline-none focus:border-gold lg:max-w-sm"
          />
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${status === s ? 'bg-ink text-white' : 'bg-canvas hover:bg-gold/30'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="max-h-[420px] overflow-auto">
          <table className="w-full min-w-[760px]">
            <thead className="sticky top-0 bg-white">
              <tr>
                <Th>Lead</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Source</Th>
                <Th>Owner</Th>
                <Th>Quotes</Th>
                <Th>Deals</Th>
                <Th>Deal Value</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => {
                const dl = deals.filter((x) => x.leadId === l.id)
                return (
                  <tr
                    key={l.id}
                    onClick={() => setLead(l.id)}
                    className="cursor-pointer border-t border-canvas hover:bg-canvas"
                  >
                    <Td>{l.id}</Td>
                    <Td>{new Date(l.t).toLocaleDateString('en-IN')}</Td>
                    <Td>
                      <Pill>{l.status}</Pill>
                    </Td>
                    <Td>{l.source}</Td>
                    <Td>{l.owner}</Td>
                    <Td>{quotes.filter((x) => x.leadId === l.id).length}</Td>
                    <Td>{dl.length}</Td>
                    <Td>{inr(dl.reduce((s, x) => s + x.value, 0))}</Td>
                  </tr>
                )
              })}
              {!rows.length && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-sm text-mist">
                    No leads match. Try another name, ID, source or owner, or reset the status
                    filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </Section>
  )
}
