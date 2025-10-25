import React, { useMemo, useState } from 'react'

export default function BMICalculator(){
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(170)
  const bmi = useMemo(() => weight / ((height/100)*(height/100)), [weight, height])
  function classification(b){
    if(b < 18.5) return 'Underweight'
    if(b < 25) return 'Normal'
    if(b < 30) return 'Overweight'
    return 'Obese'
  }
  return (
    <div className="card">
      <h3>BMI Calculator</h3>
      <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
        <div>
          <label className="small-muted">Weight (kg)</label>
          <input type="range" min={30} max={200} value={weight} onChange={e=>setWeight(Number(e.target.value))} />
          <div className="small-muted">{weight} kg</div>
        </div>
        <div>
          <label className="small-muted">Height (cm)</label>
          <input type="range" min={100} max={230} value={height} onChange={e=>setHeight(Number(e.target.value))} />
          <div className="small-muted">{height} cm</div>
        </div>
      </div>
      <div style={{marginTop:12}} className="card">
        <div className="small-muted">BMI</div>
        <div style={{fontFamily:'Courier New, monospace', fontSize:22}}>{bmi.toFixed(2)}</div>
        <div className="small-muted">{classification(bmi)}</div>
      </div>
    </div>
  )
}
