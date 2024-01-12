import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import Calc from "./Calc/Calc.jsx";

ReactDOM.createRoot(document.querySelector('.root')).render(
  <React.StrictMode>
    <Calc/>
  </React.StrictMode>,
)
