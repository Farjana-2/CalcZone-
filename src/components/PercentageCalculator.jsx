import React, { useMemo, useState } from 'react'

export default function PercentageCalculator(){
  const [value, setValue] = useState(200)
  const [percent, setPercent] = useState(10)
  const result = useMemo(() => (value * percent)/100, [value, percent])
  const increased = useMemo(() => value * (1 + percent/100), [value, percent])
  const decreased = useMemo(() => value * (1 - percent/100), [value, percent])

  return (
    <div className="card">
      <h3>Percentage Calculator</h3>
      <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
        <div>
          <label className="small-muted">Value</label>
          <input className="input" type="number" value={value} onChange={e=>setValue(Number(e.target.value))} />
        </div>
        <div>
          <label className="small-muted">Percent</label>
          <input className="input" type="number" value={percent} onChange={e=>setPercent(Number(e.target.value))} />
        </div>
      </div>

      <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10}}>
        <div className="small-muted">Percent Amount<br/><strong>{result.toFixed(2)}</strong></div>
        <div className="small-muted">Increased<br/><strong>{increased.toFixed(2)}</strong></div>
        <div className="small-muted">Decreased<br/><strong>{decreased.toFixed(2)}</strong></div>
      </div>
    </div>
  )
}
