import { leads, quotes, deals, orders, payments } from '../data/mockData'
import { Modal, Pill, inr } from './ui'

export default function DrillDownModal({ id, onClose }) {
  const l = leads.find((x) => x.id === id)
  const Q = quotes.filter((x) => x.leadId === id),
    D = deals.filter((x) => x.leadId === id)
  return (
    <Modal title={`${l.id} · ${l.name}`} onClose={onClose}>
      <div className="mb-4 flex flex-wrap gap-2">
        <Pill>{l.status}</Pill>
        <Pill>{l.source}</Pill>
        <Pill>{l.owner}</Pill>
        <Pill>{new Date(l.t).toLocaleDateString('en-IN')}</Pill>
      </div>
      <h4 className="mb-2 text-sm font-bold">Quotations ({Q.length})</h4>
      {Q.length === 0 && <p className="mb-3 text-sm text-mist">No quotations for this lead yet.</p>}
      {Q.map((x) => (
        <div
          key={x.id}
          className="mb-2 flex flex-wrap justify-between gap-x-3 rounded-xl bg-canvas px-4 py-2 text-sm"
        >
          <span>
            {x.id} · {x.service}
          </span>
          <span>
            {inr(x.value)} · <b>{x.status}</b>
          </span>
        </div>
      ))}
      <h4 className="mb-2 mt-4 text-sm font-bold">Deals, orders and payments ({D.length})</h4>
      {D.map((d) => (
        <div key={d.id} className="mb-3 rounded-xl border border-canvas p-4">
          <div className="flex flex-wrap justify-between gap-x-3 text-sm font-bold">
            <span>
              {d.id} · {d.service}
            </span>
            <span>
              {inr(d.value)} · {d.priority}
            </span>
          </div>
          {orders
            .filter((o) => o.dealId === d.id)
            .map((o) => (
              <div key={o.id} className="ml-3 mt-2 border-l-2 border-gold pl-3 text-sm">
                <div className="flex flex-wrap justify-between gap-x-3">
                  <span>{o.id}</span>
                  <Pill>
                    {o.status} · {o.progress}%
                  </Pill>
                </div>
                {payments
                  .filter((p) => p.orderId === o.id)
                  .map((p) => (
                    <p key={p.id} className="text-xs text-mist">
                      {p.id} · {p.mode} · {inr(p.amount)}
                    </p>
                  ))}
              </div>
            ))}
        </div>
      ))}
    </Modal>
  )
}
