import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import { Card, Section, Pill, C, Th, Td, ax, PAL, inr } from '../components/ui'

export default function OrdersPayments({ m, setLead }) {
  const { cur } = m
  return (
    <Section id="orders-payments" title="Orders & Payments">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Order Status">
          <C>
            <PieChart>
              <Pie
                data={m.orderStatus}
                dataKey="count"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
              >
                {m.orderStatus.map((_, i) => (
                  <Cell key={i} fill={PAL[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </C>
          <p className="text-center text-sm text-mist">
            {cur.O.filter((o) => o.status === 'Completed').length} of {cur.O.length} orders
            completed
          </p>
        </Card>
        <Card title="Collection Trend" className="lg:col-span-2">
          <C>
            <LineChart data={m.series}>
              <CartesianGrid vertical={false} stroke="#eef0f5" />
              <XAxis dataKey="day" {...ax} minTickGap={24} />
              <YAxis {...ax} width={45} tickFormatter={(v) => v / 1000 + 'K'} />
              <Tooltip formatter={inr} />
              <Line dataKey="Collected" stroke={PAL[1]} strokeWidth={3} dot={false} />
            </LineChart>
          </C>
        </Card>
        <Card title="Order Progress">
          <div className="space-y-3">
            {cur.O.filter((o) => o.status !== 'Completed')
              .slice(0, 6)
              .map((o) => (
                <button
                  key={o.id}
                  onClick={() => setLead(o.leadId)}
                  className="block w-full text-left"
                >
                  <div className="flex justify-between text-xs font-semibold">
                    <span>{o.id}</span>
                    <Pill>{o.status}</Pill>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-canvas">
                    <div className="h-2 rounded-full bg-gold" style={{ width: o.progress + '%' }} />
                  </div>
                </button>
              ))}
          </div>
        </Card>
        <Card title="Payment History" className="lg:col-span-2">
          <div className="max-h-[420px] overflow-auto">
            <table className="w-full min-w-[520px]">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <Th>Payment</Th>
                  <Th>Date</Th>
                  <Th>Mode</Th>
                  <Th>Amount</Th>
                </tr>
              </thead>
              <tbody>
                {[...cur.P]
                  .sort((a, b) => b.t - a.t)
                  .map((p) => (
                    <tr
                      key={p.id}
                      onClick={() => setLead(p.leadId)}
                      className="cursor-pointer border-t border-canvas hover:bg-canvas"
                    >
                      <Td>{p.id}</Td>
                      <Td>{new Date(p.t).toLocaleDateString('en-IN')}</Td>
                      <Td>{p.mode}</Td>
                      <Td>{inr(p.amount)}</Td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Section>
  )
}
