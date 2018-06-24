import React from 'react'
import {AppBar, Toolbar, Button, IconButton, Typography} from '@material-ui/core'
import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu'

const Title = styled(Typography)`
  flex: 1;
`

const Chip = styled(Typography)`
  background: rgba(0, 0, 0, 0.2);
  margin: 10px !important;
  padding: 10px 30px;
  border-radius: 25px;
`

export default(props) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Title variant="title" color="inherit">
        EthRoulette
      </Title>

      <Chip variant="subheading" color="inherit">
        Balance: {props.balance} ETH
      </Chip>

      <Chip variant="subheading" color="inherit">
        Account: {props.accountAddress}
      </Chip>
    </Toolbar>
  </AppBar>
)
