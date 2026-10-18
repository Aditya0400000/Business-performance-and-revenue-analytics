import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts'
import { Card, Section, C, Th, Td, ax, axRot, PAL, inr } from '../components/ui'

export default function DealsRevenue({ m, setLead }) {
  const { cur } = m
  return (
    <Section id="deals-revenue" title="Deals & Revenue">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Revenue by Service">
          <C>
            <BarChart data={m.byService}>
              <XAxis dataKey="name" {...axRot} />
              <YAxis {...ax} width={45} tickFormatter={(v) => v / 1000 + 'K'} />
              <Tooltip formatter={inr} />
              <Bar dataKey="revenue" fill={PAL[0]} radius={6} />
            </BarChart>
          </C>
        </Card>
        <Card title="Revenue by Category">
          <C>
            <PieChart>
              <Pie
                data={m.byCategory}
                dataKey="revenue"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
              >
                {m.byCategory.map((_, i) => (
                  <Cell key={i} fill={PAL[i]} />
                ))}
              </Pie>
              <Tooltip formatter={inr} />
              <Legend />
            </PieChart>
          </C>
        </Card>
        <Card title="Priority Breakdown">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[300px]">
              <thead>
                <tr>
                  <Th>Priority</Th>
                  <Th>Deals</Th>
                  <Th>Revenue</Th>
                  <Th>%</Th>
                </tr>
              </thead>
              <tbody>
                {m.priority.map((p) => (
                  <tr key={p.name} className="border-t border-canvas">
                    <Td>{p.name}</Td>
                    <Td>{p.deals}</Td>
                    <Td>{inr(p.revenue)}</Td>
                    <Td>{cur.value ? ((p.revenue / cur.value) * 100).toFixed(1) : 0}%</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Daily Revenue Trend" className="lg:col-span-2">
          <C>
            <AreaChart data={m.series}>
              <CartesianGrid vertical={false} stroke="#eef0f5" />
              <XAxis dataKey="day" {...ax} minTickGap={24} />
              <YAxis {...ax} width={45} tickFormatter={(v) => v / 1000 + 'K'} />
              <Tooltip formatter={inr} />
              <Legend />
              <Area dataKey="Revenue" stroke={PAL[0]} fill={PAL[0]} fillOpacity={0.15} />
              <Area dataKey="Collected" stroke={PAL[1]} fill={PAL[1]} fillOpacity={0.2} />
            </AreaChart>
          </C>
        </Card>
        <Card title="Total vs Collected">
          <div className="space-y-3">
            <div className="rounded-xl bg-canvas p-4">
              <p className="text-xs text-mist">Total Deal Value</p>
              <p className="text-2xl font-extrabold">{inr(cur.value)}</p>
            </div>
            <div className="rounded-xl bg-teal/10 p-4">
              <p className="text-xs text-mist">Collected</p>
              <p className="text-2xl font-extrabold text-teal">{inr(cur.collected)}</p>
            </div>
            <div className="rounded-xl bg-rose/10 p-4">
              <p className="text-xs text-mist">Outstanding</p>
              <p className="text-2xl font-extrabold text-rose">
                {inr(Math.max(0, cur.value - cur.collected))}
              </p>
            </div>
          </div>
        </Card>
      </div>
      <Card title="Deal Progress (top deals, click to drill down)" className="mt-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {m.dealProgress.map((d) => {
            const p = Math.min(100, (d.paid / d.value) * 100)
            return (
              <button
                key={d.id}
                onClick={() => setLead(d.leadId)}
                className="rounded-xl border border-canvas p-3 text-left transition hover:border-gold"
              >
                <div className="flex justify-between text-sm font-semibold">
                  <span>
                    {d.id} · {d.service}
                  </span>
                  <span>{p.toFixed(0)}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-canvas">
                  <div className="h-2 rounded-full bg-teal" style={{ width: p + '%' }} />
                </div>
                <p className="mt-1 text-xs text-mist">
                  {inr(d.paid)} of {inr(d.value)}
                </p>
              </button>
            )
          })}
        </div>
      </Card>
    </Section>
  )
}
