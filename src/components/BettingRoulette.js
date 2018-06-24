import React from 'react'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'

const RouletteRoot = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  margin-bottom: 80px;
  margin-top: 20px;
`

const Title = styled(Typography)`
  color: white !important;
  margin: 20px auto !important;
`;

export default () => {
  return (
    <RouletteRoot>
      <Title variant="display1">Welcome to EthRoulette!</Title>

    </RouletteRoot>
  )
}
