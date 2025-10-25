import React, { useEffect, useState } from 'react'

export default function BasicCalculator(){
  const [expr, setExpr] = useState('')
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cz-basic-history')||'[]') } catch { return [] }
  })

  useEffect(()=> localStorage.setItem('cz-basic-history', JSON.stringify(history)), [history])

  function press(v){ setExpr(e => e + v) }
  function back(){ setExpr(e => e.slice(0,-1)) }
  function clearAll(){ setExpr('') }
  function evalExpr(){
    try{
      if(!/^[0-9+\-*/(). %]+$/.test(expr)) throw new Error('Invalid')
      // eslint-disable-next-line no-eval
      const result = String(eval(expr.replace('%','/100')))
      setHistory(h => [{expr, result, at:Date.now()}, ...h].slice(0,100))
      setExpr(result)
    }catch(e){ setExpr('Error') }
  }

  useEffect(() => {
    const handler = e => {
      if(e.key === 'Enter'){ evalExpr(); e.preventDefault(); }
      else if(e.key === 'Backspace'){ back(); e.preventDefault(); }
      else if(/^[0-9.+\-*/()% ]$/.test(e.key)){ setExpr(prev => prev + e.key) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [expr])

  const keys = ['7','8','9','/','4','5','6','*','1','2','3','-','.','0','%','+']

  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3>Basic Calculator</h3>
        <div className="small">History: {history.length}</div>
      </div>

      <div className="display" style={{marginTop:12}}>{expr || '0'}</div>

      <div className="keypad">
        {keys.map(k => (
          <button key={k} onClick={() => press(k)} className={"key " + (['/','*','-','+','%'].includes(k) ? 'op' : '')}>{k}</button>
        ))}
        <button onClick={back} className="key" style={{gridColumn:'span 2'}}>⌫ Back</button>
        <button onClick={clearAll} className="key">Clear</button>
        <button onClick={evalExpr} className="key op" style={{gridColumn:'span 2'}}> = </button>
      </div>

      <div className="history" aria-live="polite">
        {history.length===0 && <div className="small-muted">No history yet</div>}
        {history.map((h,i) => (
          <div key={h.at + i} className="history-item">
            <div style={{flex:1}}>{h.expr} = {h.result}</div>
            <div style={{display:'flex', gap:8}}>
              <button className="btn-ghost" onClick={() => setExpr(h.result)}>Use</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
