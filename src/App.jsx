import { useMemo, useState } from 'react'
import { NOW } from './data/mockData'
import { compute } from './utils/analytics'
import Header from './components/Header'
import KpiGrid from './components/KpiGrid'
import DrillDownModal from './components/DrillDownModal'
import LeadAnalytics from './sections/LeadAnalytics'
import QuotationAnalytics from './sections/QuotationAnalytics'
import DealsRevenue from './sections/DealsRevenue'
import OrdersPayments from './sections/OrdersPayments'
import LeadExplorer from './sections/LeadExplorer'

const DAY = 864e5
const sod = (t) => new Date(t).setHours(0, 0, 0, 0)
const eod = (t) => new Date(t).setHours(23, 59, 59, 999)
const iso = (t) => new Date(t).toISOString().slice(0, 10)

export default function App() {
  const [preset, setPreset] = useState(30)
  const [cf, setCf] = useState(iso(NOW - 30 * DAY))
  const [ct, setCt] = useState(iso(NOW))
  const [leadId, setLeadId] = useState(null)
  const [status, setStatus] = useState('All')
  const go = (id, st) => {
    if (st) setStatus(st)
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      60,
    )
  }

  const from = preset ? sod(NOW - (preset - 1) * DAY) : sod(new Date(cf))
  const to = preset ? eod(NOW) : eod(new Date(ct))
  const m = useMemo(() => compute(from, Math.max(from, to)), [from, to])
  const days = Math.round((to - from) / DAY) + 1

  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-16">
      <Header {...{ preset, setPreset, cf, setCf, ct, setCt }} />
      <p className="mb-4 text-xs font-semibold text-mist">
        Comparing with the previous {days} day{days > 1 ? 's' : ''}
      </p>
      <KpiGrid m={m} go={go} />
      <LeadAnalytics m={m} />
      <QuotationAnalytics m={m} />
      <DealsRevenue m={m} setLead={setLeadId} />
      <OrdersPayments m={m} setLead={setLeadId} />
      <LeadExplorer m={m} setLead={setLeadId} status={status} setStatus={setStatus} />
      {leadId && <DrillDownModal id={leadId} onClose={() => setLeadId(null)} />}
    </div>
  )
}
