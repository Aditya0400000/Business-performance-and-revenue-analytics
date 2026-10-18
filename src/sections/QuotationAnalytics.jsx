import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { Card, Section, C, Th, Td, ax, axRot, PAL, inr } from '../components/ui'

export default function QuotationAnalytics({ m, setLead }) {
  const { cur } = m
  return (
    <Section id="quotation-analytics" title="Quotation Analytics">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Quotations by Service">
          <C>
            <BarChart data={m.byService}>
              <XAxis dataKey="name" {...axRot} />
              <YAxis {...ax} width={28} />
              <Tooltip />
              <Bar dataKey="quotes" fill={PAL[0]} radius={6} />
            </BarChart>
          </C>
        </Card>
        <Card title="Quotation Value by Service">
          <C>
            <BarChart data={m.byService}>
              <XAxis dataKey="name" {...axRot} />
              <YAxis {...ax} width={45} tickFormatter={(v) => v / 1000 + 'K'} />
              <Tooltip formatter={inr} />
              <Bar dataKey="amount" fill={PAL[1]} radius={6} />
            </BarChart>
          </C>
        </Card>
        <Card title="Quote to Deal Conversion">
          <p className="mt-8 text-center text-5xl font-extrabold text-teal">
            {(cur.Q.length ? (cur.D.length / cur.Q.length) * 100 : 0).toFixed(1)}%
          </p>
          <p className="mt-2 text-center text-sm text-mist">
            {cur.D.length} deals / {cur.Q.length} quotations
          </p>
        </Card>
      </div>
      <Card title="Service-wise Quotation Details" className="mt-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr>
                <Th>Service</Th>
                <Th>Quotes</Th>
                <Th>Amount</Th>
                <Th>Accepted</Th>
                <Th>Pending</Th>
                <Th>Rejected</Th>
                <Th>Conv.</Th>
              </tr>
            </thead>
            <tbody>
              {m.byService.map((s) => (
                <tr key={s.name} className="border-t border-canvas">
                  <Td>{s.name}</Td>
                  <Td>{s.quotes}</Td>
                  <Td>{inr(s.amount)}</Td>
                  <Td>{s.accepted}</Td>
                  <Td>{s.pending}</Td>
                  <Td>{s.rejected}</Td>
                  <Td>{s.rate.toFixed(1)}%</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Section>
  )
}
