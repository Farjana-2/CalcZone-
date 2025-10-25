import React, { useMemo, useState } from 'react'

export default function MortgageCalculator(){
  const [principal, setPrincipal] = useState(300000)
  const [years, setYears] = useState(30)
  const [rate, setRate] = useState(3.5)

  const monthlyRate = rate/100/12
  const months = years*12
  const monthly = useMemo(() => {
    if(monthlyRate === 0) return principal / months
    const m = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
    return m
  }, [principal, monthlyRate, months])

  const amortization = useMemo(() => {
    let bal = principal
    const schedule = []
    for(let i=1;i<=months;i++){
      const interest = bal * monthlyRate
      const principalPaid = monthly - interest
      bal -= principalPaid
      schedule.push({month:i, interest, principalPaid, balance: Math.max(bal,0)})
    }
    return schedule
  }, [principal, monthlyRate, months, monthly])

  const totalPayment = monthly * months
  const totalInterest = totalPayment - principal

  return (
    <div className="card">
      <h3>Mortgage Calculator</h3>
      <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
        <div>
          <label className="small-muted">Principal</label>
          <input className="input" type="number" value={principal} onChange={e=>setPrincipal(Number(e.target.value))} />
        </div>
        <div>
          <label className="small-muted">Interest Rate (%)</label>
          <input type="range" min={0} max={15} step={0.01} value={rate} onChange={e=>setRate(Number(e.target.value))} />
          <div className="small-muted">{rate}%</div>
        </div>
        <div>
          <label className="small-muted">Years</label>
          <input type="range" min={1} max={40} value={years} onChange={e=>setYears(Number(e.target.value))} />
          <div className="small-muted">{years} years</div>
        </div>
        <div>
          <label className="small-muted">Monthly Payment</label>
          <div className="display">{monthly.toFixed(2)}</div>
        </div>
      </div>

      <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10}}>
        <div className="small-muted">Total Payment<br/><strong>{totalPayment.toFixed(2)}</strong></div>
        <div className="small-muted">Total Interest<br/><strong>{totalInterest.toFixed(2)}</strong></div>
        <div className="small-muted">Months<br/><strong>{months}</strong></div>
      </div>

      <div style={{marginTop:12}}>
        <h4 className="small-muted">Amortization (first 12 months)</h4>
        <div style={{overflow:'auto', maxHeight:220, marginTop:8}}>
          <table style={{width:'100%', fontSize:13, borderCollapse:'collapse'}}>
            <thead style={{textAlign:'left', color:'var(--muted)'}}><tr><th>Month</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead>
            <tbody>
              {amortization.slice(0,12).map(r=>(
                <tr key={r.month}><td>{r.month}</td><td>{r.principalPaid.toFixed(2)}</td><td>{r.interest.toFixed(2)}</td><td>{r.balance.toFixed(2)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
