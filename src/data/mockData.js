const DAY = 24 * 60 * 60 * 1000
export const NOW = Date.now()

//n = Service Name
//c = category
//p = base price

export const SERVICES = [
  { n: 'Private Limited', c: 'Registration', p: 12000 },
  { n: 'LLP', c: 'Registration', p: 8000 },
  { n: 'GST', c: 'Compliance', p: 5000 },
  { n: 'Trademark', c: 'IP', p: 9000 },
  { n: 'FSSAI License', c: 'Licensing', p: 6000 },
  { n: 'ISO Certification', c: 'Licensing', p: 15000 },
]
const LEAD_SOURCES = ['Google Ads', 'Website', 'Just Dial', 'Referral']
const OWNERS = ['Nancy Singh', 'Sneha Choudhary', 'Tannu Kumari']

let seed = 7
const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647
const pick = (list) => list[Math.floor(random() * list.length)]
const randomBetween = (min, max) => Math.floor(min + random() * (max - min + 1))
const notInFuture = (time) => Math.min(NOW, time)

export const leads = []
export const quotes = []
export const deals = []
export const orders = []
export const payments = []

function pickLeadStatus() {
  const x = random()
  if (x < 0.35) return 'Unqualified'
  if (x < 0.55) return 'New'
  if (x < 0.8) return 'Qualified'
  return 'Converted'
}

function addPayments(order, deal, orderCount) {
  const paymentCount = randomBetween(0, 2)
  for (let i = 1; i <= paymentCount; i++) {
    payments.push({
      id: `P-${order.id.slice(2)}-${i}`,
      orderId: order.id,
      dealId: deal.id,
      leadId: deal.leadId,
      t: notInFuture(order.t + i * DAY),
      amount: Math.round(((deal.value / orderCount) * (0.6 + random() * 0.4)) / 2),
      mode: pick(['UPI', 'Bank Transfer', 'Card']),
    })
  }
}

function addOrders(deal) {
  const orderCount = randomBetween(1, 2)
  for (let i = 1; i <= orderCount; i++) {
    const status = pick([
      'Pending',
      'In Progress',
      'In Progress',
      'Completed',
      'Completed',
      'On Hold',
    ])
    const progress = status === 'Completed' ? 100 : status === 'Pending' ? 0 : randomBetween(20, 80)
    const order = {
      id: `O-${deal.id.slice(2)}-${i}`,
      dealId: deal.id,
      leadId: deal.leadId,
      t: notInFuture(deal.t + DAY),
      service: deal.service,
      status,
      progress,
    }
    orders.push(order)
    addPayments(order, deal, orderCount)
  }
}

function addDeal(quote, lead) {
  const deal = {
    id: `D-${quote.id.slice(2)}`,
    leadId: lead.id,
    quoteId: quote.id,
    t: notInFuture(lead.t + 2 * DAY),
    service: quote.service,
    category: quote.category,
    value: quote.value,
    priority: pick(['High', 'High', 'Medium', 'Low']),
  }
  deals.push(deal)
  addOrders(deal)
}

function addQuotes(lead) {
  const quoteCount = randomBetween(1, 2)
  for (let i = 1; i <= quoteCount; i++) {
    const service = pick(SERVICES)
    const isFirstOfConverted = lead.status === 'Converted' && i === 1
    const quote = {
      id: `Q-${lead.id.slice(2)}-${i}`,
      leadId: lead.id,
      t: notInFuture(lead.t + DAY),
      service: service.n,
      category: service.c,
      value: Math.round(service.p * (0.8 + random() * 0.6)),
      status: isFirstOfConverted ? 'Accepted' : pick(['Pending', 'Pending', 'Rejected']),
    }
    quotes.push(quote)
    if (quote.status === 'Accepted') addDeal(quote, lead)
  }
}

function generate(leadCount = 450) {
  for (let i = 1; i <= leadCount; i++) {
    const lead = {
      id: `L-${1000 + i}`,
      name: `Client ${1000 + i}`,
      t: NOW - randomBetween(0, 89) * DAY - randomBetween(0, DAY - 1),
      status: pickLeadStatus(),
      source: pick(LEAD_SOURCES),
      owner: pick(OWNERS),
    }
    leads.push(lead)
    if (lead.status === 'Qualified' || lead.status === 'Converted') addQuotes(lead)
  }
}

generate()
