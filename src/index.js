import React from 'react'
import ReactDOM from 'react-dom'
import App from './routes/App'
import registerServiceWorker from './utils/registerServiceWorker'
import './public/scss/app.scss'

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
registerServiceWorker()
