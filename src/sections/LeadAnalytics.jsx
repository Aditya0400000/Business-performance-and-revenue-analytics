import {
  LineChart,
  Line,
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
} from 'recharts'
import { Card, Section, C, ax, PAL } from '../components/ui'

export default function LeadAnalytics({ m, setLead }) {
  const { cur } = m
  return (
    <Section id="lead-analytics" title="Lead Analytics">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Lead Funnel">
          <C>
            <BarChart data={m.funnel} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" {...ax} width={70} />
              <Tooltip />
              <Bar dataKey="v" radius={8}>
                {m.funnel.map((_, i) => (
                  <Cell key={i} fill={PAL[i]} />
                ))}
              </Bar>
            </BarChart>
          </C>
        </Card>
        <Card title="Lead Trend">
          <C>
            <LineChart data={m.series}>
              <CartesianGrid vertical={false} stroke="#eef0f5" />
              <XAxis dataKey="day" {...ax} minTickGap={24} />
              <YAxis {...ax} width={30} />
              <Tooltip />
              <Legend />
              {['New', 'Qualified', 'Converted'].map((k, i) => (
                <Line key={k} dataKey={k} stroke={PAL[i]} strokeWidth={2.5} dot={false} />
              ))}
            </LineChart>
          </C>
        </Card>
        <Card title="Lead Sources">
          <C>
            <PieChart>
              <Pie
                data={m.sources}
                dataKey="count"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                {m.sources.map((_, i) => (
                  <Cell key={i} fill={PAL[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </C>
        </Card>
      </div>
    </Section>
  )
}
