import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { ThemeProvider } from 'styled-components'
import StartPage from './components/StartPage'
import theme from './theme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StartPage />
  </ThemeProvider>,
  document.getElementById('root')
)

// Todo - see if serviceWorker would help
serviceWorker.unregister()
