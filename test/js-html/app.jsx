import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-10px w-100pct">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="m-10px" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="m-10px p-10px" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="bg-hexfff">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="fg-hexfff">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
