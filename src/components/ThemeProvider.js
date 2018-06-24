import React from 'react'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blueGrey[400],
      main: blueGrey[900],
      dark: blueGrey[600],
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
})

export default(props) => {
  return (
    <MuiThemeProvider theme={theme}>
      {props.children}
    </MuiThemeProvider>
  )
}
