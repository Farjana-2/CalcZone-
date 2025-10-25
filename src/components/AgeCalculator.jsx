import React, { useMemo, useState } from 'react'

export default function AgeCalculator(){
  const [dob, setDob] = useState('')
  const age = useMemo(() => {
    if(!dob) return null
    const diff = Date.now() - new Date(dob).getTime()
    const years = Math.floor(diff / (1000*60*60*24*365.25))
    return years
  }, [dob])

  return (
    <div className="card">
      <h3>Age Calculator</h3>
      <div style={{marginTop:12}}>
        <label className="small-muted">Date of Birth</label>
        <input className="input" type="date" value={dob} onChange={e=>setDob(e.target.value)} />
      </div>
      <div style={{marginTop:12}} className="card">
        <div className="small-muted">{age === null ? 'Pick a date' : `Age: ${age} years`}</div>
      </div>
    </div>
  )
}
