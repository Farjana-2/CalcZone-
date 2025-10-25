import React, { useMemo, useState } from 'react'

export default function TipCalculator(){
  const [bill, setBill] = useState(100)
  const [tipPct, setTipPct] = useState(15)
  const [people, setPeople] = useState(1)

  const tipAmount = useMemo(() => bill * (tipPct/100), [bill, tipPct])
  const total = useMemo(() => bill + tipAmount, [bill, tipAmount])
  const perPerson = useMemo(() => total / Math.max(1, people), [total, people])

  return (
    <div className="card">
      <h3>Tip Calculator</h3>
      <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
        <div>
          <label className="small-muted">Bill</label>
          <input className="input" type="number" value={bill} onChange={e=>setBill(Number(e.target.value))} />
        </div>
        <div>
          <label className="small-muted">Tip %</label>
          <input type="range" min={0} max={50} value={tipPct} onChange={e=>setTipPct(Number(e.target.value))} />
          <div className="small-muted">{tipPct}%</div>
        </div>
        <div>
          <label className="small-muted">People</label>
          <input className="input" type="number" value={people} min={1} onChange={e=>setPeople(Number(e.target.value))} />
        </div>
        <div>
          <label className="small-muted">Tip Amount</label>
          <div className="display">{tipAmount.toFixed(2)}</div>
        </div>
      </div>

      <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
        <div className="small-muted">Total<br/><strong>{total.toFixed(2)}</strong></div>
        <div className="small-muted">Per Person<br/><strong>{perPerson.toFixed(2)}</strong></div>
      </div>
    </div>
  )
}
