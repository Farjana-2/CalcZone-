import React, { useEffect, useMemo, useState } from 'react'
import Tabs from './components/Tabs'
import BasicCalculator from './components/BasicCalculator'
import CurrencyConverter from './components/CurrencyConverter'
import MortgageCalculator from './components/MortgageCalculator'
import BMICalculator from './components/BMICalculator'
import TipCalculator from './components/TipCalculator'
import PercentageCalculator from './components/PercentageCalculator'
import AgeCalculator from './components/AgeCalculator'
import { FiSun, FiMoon } from 'react-icons/fi'

const tabs = [
  { key: 'basic', label: 'Basic' },
  { key: 'currency', label: 'Currency' },
  { key: 'mortgage', label: 'Mortgage' },
  { key: 'bmi', label: 'BMI' },
  { key: 'tip', label: 'Tip' },
  { key: 'percent', label: 'Percent' },
  { key: 'age', label: 'Age' },
]

export default function App(){
  const [active, setActive] = useState('basic')
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('cz-theme') || 'light' } catch { return 'light' }
  })
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', theme==='dark')
    try { localStorage.setItem('cz-theme', theme) } catch {}
  }, [theme])

  useEffect(()=>{
    // simulate a small loading time for the loading screen
    const t = setTimeout(()=> setLoading(false), 700)
    return ()=> clearTimeout(t)
  },[])

  const toggleTheme = () => setTheme(t => t==='light' ? 'dark' : 'light')

  return (
    <div className="app">
      {loading && (
        <div className="loading-wrap">
          <div className="loader">CalcZone</div>
        </div>
      )}

      <header className="header">
        <div className="brand">
          <div className="logo">CZ</div>
          <div>
            <div className="title">CalcZone Pro</div>
            <div className="subtitle">Modern calculator hub</div>
          </div>
        </div>
        <div className="controls">
          <div className="small">Theme</div>
          <button className="switch" onClick={toggleTheme}>{theme==='light' ? <FiMoon/> : <FiSun/>}</button>
        </div>
      </header>

      <div className="card">
        <Tabs tabs={tabs} active={active} onChange={setActive} />
        <div style={{marginTop:16}} className="layout">
          <main>
            {active==='basic' && <BasicCalculator />}
            {active==='currency' && <CurrencyConverter />}
            {active==='mortgage' && <MortgageCalculator />}
            {active==='bmi' && <BMICalculator />}
            {active==='tip' && <TipCalculator />}
            {active==='percent' && <PercentageCalculator />}
            {active==='age' && <AgeCalculator />}
          </main>
          <aside className="card aside-card">
            <div className="small">Quick Tips</div>
            <div className="small-muted">Use your keyboard for numbers and operators in Basic calculator. Press Enter to evaluate.</div>
            <div className="small-muted">Currency rates are offline and editable in the currency component.</div>
            <div style={{marginTop:6}}><strong>CalcZone Pro</strong> — built plain CSS, responsive, and offline-friendly.</div>
          </aside>
        </div>
      </div>

      <footer className="footer">Made with ❤️ — CalcZone Pro</footer>
    </div>
  )
}
