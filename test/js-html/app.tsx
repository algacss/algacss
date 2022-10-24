import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import './app.css'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="maxWidth-80vw" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class="mxw-100vw mxh-80vh" alt="Preact logo" />
        </a>
      </div>
      <h1>Vite + Preact</h1>
      <div class="pt-1.5rem">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="pi-fixed">
        Click on the Vite and Preact logos to learn more
      </p>
    </>
  )
}
