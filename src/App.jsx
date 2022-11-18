import React, { useState, useEffect } from 'react'

export default function App() {
  const LOCAL_STORAGE_ITEM = 'amv1017-github-notepad'

  const [state, setState] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_ITEM)
    if (data) {
      setState(data.split(',').map(text => ({id: uid(), text})))
    }
  }, [])

  const uid = () => crypto.randomUUID()

  const filtered = (id) => state.filter(s => s.id !== id)

  const updateState = (newState) => {
    setState(newState)
    localStorage.setItem(LOCAL_STORAGE_ITEM, newState.map(s => s.text).join(','))
  }

  return (<div className="container">
    <textarea value={text} onChange={(e) => setText(e.target.value)} />
    <button className="btn-add" onClick={() => {
      updateState([...state, {id: uid(), text}])
      setText('')
    }}>Add</button>
    {state.filter(s => s.text !== '').map(s => <div className="note" key={s.id}>
      <div>{s.text}</div>
      <p onClick={() => {
        updateState(filtered(s.id))
      }}>✕</p>
    </div>)}
  </div>)
}
