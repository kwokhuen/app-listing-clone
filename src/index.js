import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import registerServiceWorker from './registerServiceWorker'
import './styles/styles.css'
import 'ant-design-pro/dist/ant-design-pro.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
