import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import StartPage from './StartPage'
import theme from './theme/index.js/index.js.js'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StartPage />
  </ThemeProvider>,
  document.getElementById('root')
)

// Todo - see if serviceWorker would help
serviceWorker.unregister()
