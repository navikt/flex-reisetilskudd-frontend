import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './app'
import env from './utils/environment'

if (env.isMockBackend) {
    require('./data/mock')
}

ReactDOM.render(
    <BrowserRouter basename="/syk/reisetilskudd">
        <App />
    </BrowserRouter>,
    document.getElementById('maincontent') as HTMLElement
)

if (env.isQ1 || env.isProd) {
    const src = `${env.frontendloggerRoot}/frontendlogger/logger.js`
    const script = document.createElement('script')
    script.src = src
    script.async = true
    document.body.appendChild(script)
}
