import React from 'react'
import {AppBar, Toolbar, Button, IconButton, Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'


export default() => (
  <AppBar position="static" color="primary">
    <Toolbar>      
      <Typography variant="title" color="inherit">
        EthRoulette
      </Typography>
    </Toolbar>
  </AppBar>
)
