import React, { useMemo, useState } from 'react'

const FALLBACK = { USD:1, EUR:0.92, INR:83, GBP:0.78, JPY:152, AUD:1.5 }

export default function CurrencyConverter(){
  const [rates, setRates] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cz-rates')) || FALLBACK } catch { return FALLBACK }
  })
  const [base, setBase] = useState('USD')
  const [target, setTarget] = useState('INR')
  const [amount, setAmount] = useState(1)

  const converted = useMemo(() => {
    const b = rates[base] || 1
    const t = rates[target] || 1
    return (amount / b) * t
  }, [amount, base, target, rates])

  function swap(){ const s = base; setBase(target); setTarget(s) }

  function updateRate(code, value){
    setRates(r => { const next = {...r, [code]: Number(value) || 0}; try{ localStorage.setItem('cz-rates', JSON.stringify(next)) }catch{}; return next })
  }

  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <h3>Currency Converter</h3>
        <div className="small">Offline rates</div>
      </div>

      <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
        <div>
          <label className="small-muted">Amount</label>
          <input className="input" type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} />
        </div>
        <div>
          <label className="small-muted">Result</label>
          <div className="display">{converted.toFixed(4)}</div>
        </div>

        <div>
          <label className="small-muted">From</label>
          <select value={base} onChange={e=>setBase(e.target.value)} className="input">
            {Object.keys(rates).map(k=> <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div>
          <label className="small-muted">To <button onClick={swap} className="btn-ghost" style={{marginLeft:8}}>Swap</button></label>
          <select value={target} onChange={e=>setTarget(e.target.value)} className="input">
            {Object.keys(rates).map(k=> <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      </div>

      <div style={{marginTop:12}}>
        <div className="small-muted">Edit rates (base USD = 1)</div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:8}}>
          {Object.entries(rates).map(([k,v])=> (
            <div key={k} style={{display:'flex', gap:8, alignItems:'center'}}>
              <div style={{width:56}} className="small">{k}</div>
              <input className="input" value={v} onChange={e=>updateRate(k, e.target.value)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
