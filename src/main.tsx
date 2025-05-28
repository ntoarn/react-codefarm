import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {StyleProvider} from "@ant-design/cssinjs";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyleProvider layer>
        <App />
    </StyleProvider>
  </React.StrictMode>,
)
