import React from 'react'
import styled from 'styled-components'
import BettingRoulette from '../components/BettingRoulette'
import BettingHistory from '../components/BettingHistory'

const BettingRoot = styled.div `
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  width: 100%;
  height: 100vh;
  max-width: 1100px;
`

export default(props) => {
  return (
    <BettingRoot>
      <BettingRoulette/>
      <BettingHistory/>
    </BettingRoot>
  )
}
