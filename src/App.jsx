import React, { useState, useEffect } from 'react'

export default function App() {
  const LOCAL_STORAGE_ITEM = 'amv1017-github-notepad'

  const [state, setState] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_ITEM)
    if (data) {
      setState(data.split(','))
    }
  }, [])

  return (<div className="container">
    <textarea value={text} onChange={(e) => setText(e.target.value)} />
    <button className="btn-add" onClick={() => {
      const updated = [...state, text]
      setState(updated)
      setText('')
      localStorage.setItem(LOCAL_STORAGE_ITEM, updated)
    }}>Add</button>
    {state.filter(e => e !== '').map((e, key) => <div className="note" key={key}>{e}</div>)}
    <button className="btn-clear" onClick={() => {
      localStorage.setItem(LOCAL_STORAGE_ITEM, [])
      location.reload()
    }}>Clear</button>
  </div>)
}
