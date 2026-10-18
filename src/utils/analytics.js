import { leads, quotes, deals, orders, payments, SERVICES } from '../data/mockData'
const DAY = 864e5
export const pct = (c, p) => (p ? ((c - p) / p) * 100 : c ? 100 : 0)
const sum = (a, k) => a.reduce((s, x) => s + x[k], 0)
const inR = (a, b) => (x) => x.t >= a && x.t <= b
const isQ = (l) => l.status === 'Qualified' || l.status === 'Converted'
function slice(a, b) {
  const f = inR(a, b)
  const L = leads.filter(f),
    Q = quotes.filter(f),
    D = deals.filter(f),
    O = orders.filter(f),
    P = payments.filter(f)
  const conv = L.filter((l) => l.status === 'Converted').length
  return {
    L,
    Q,
    D,
    O,
    P,
    conv,
    qual: L.filter(isQ).length,
    unq: L.filter((l) => l.status === 'Unqualified').length,
    rate: L.length ? (conv / L.length) * 100 : 0,
    value: sum(D, 'value'),
    collected: sum(P, 'amount'),
  }
}
const group = (arr, key, names) =>
  names.map((n) => ({ name: n, count: arr.filter((x) => x[key] === n).length }))
export function compute(from, to) {
  const len = to - from + 1
  const cur = slice(from, to),
    prev = slice(from - len, from - 1)
  const step = len > 31 * DAY ? 7 * DAY : DAY
  const series = []
  for (let t = from; t <= to; t += step) {
    const f = inR(t, t + step - 1)
    const L = cur.L.filter(f)
    series.push({
      day: new Date(t).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      New: L.length,
      Qualified: L.filter(isQ).length,
      Converted: L.filter((l) => l.status === 'Converted').length,
      Revenue: sum(cur.D.filter(f), 'value'),
      Collected: sum(cur.P.filter(f), 'amount'),
    })
  }
  const byService = SERVICES.map((s) => {
    const q = cur.Q.filter((x) => x.service === s.n),
      d = cur.D.filter((x) => x.service === s.n)
    const acc = q.filter((x) => x.status === 'Accepted').length
    return {
      name: s.n,
      quotes: q.length,
      amount: sum(q, 'value'),
      accepted: acc,
      pending: q.filter((x) => x.status === 'Pending').length,
      rejected: q.filter((x) => x.status === 'Rejected').length,
      rate: q.length ? (acc / q.length) * 100 : 0,
      deals: d.length,
      revenue: sum(d, 'value'),
    }
  })
  const cats = [...new Set(SERVICES.map((s) => s.c))]
  const byCategory = cats.map((c) => ({
    name: c,
    revenue: sum(
      cur.D.filter((d) => d.category === c),
      'value',
    ),
  }))
  const priority = ['High', 'Medium', 'Low'].map((p) => {
    const d = cur.D.filter((x) => x.priority === p)
    return { name: p, deals: d.length, revenue: sum(d, 'value') }
  })
  const dealProgress = cur.D.map((d) => ({
    ...d,
    paid: sum(
      payments.filter((p) => p.dealId === d.id),
      'amount',
    ),
  }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)
  return {
    cur,
    prev,
    series,
    byService,
    byCategory,
    priority,
    dealProgress,
    funnel: [
      { name: 'New', v: cur.L.length },
      { name: 'Qualified', v: cur.qual },
      { name: 'Converted', v: cur.conv },
    ],
    sources: group(cur.L, 'source', ['Google Ads', 'Website', 'Just Dial', 'Referral']),
    orderStatus: group(cur.O, 'status', ['Pending', 'In Progress', 'Completed', 'On Hold']),
  }
}
