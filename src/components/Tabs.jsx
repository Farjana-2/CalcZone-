import React from 'react'

export default function Tabs({ tabs, active, onChange }){
  return (
    <div className="tabs">
      {tabs.map(t => (
        <button key={t.key} onClick={() => onChange(t.key)} className={"tab " + (active===t.key ? 'active' : '')}>
          {t.label}
        </button>
      ))}
    </div>
  )
}
