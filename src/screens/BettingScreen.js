import React from 'react'
import styled from 'styled-components'
import BettingRoulette from '../components/BettingRoulette'
import BettingHistory from '../components/BettingHistory'

const BettingRoot = styled.div `
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  width: 100%;
  max-width: 1100px;
`
export default class BettingScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  handleSingleBetPlace = (betUnit, number) => {
    this.props.onSingleBetPlace(betUnit, number)
  }

  render() {
    return (
      <BettingRoot>
        <BettingRoulette betUnit={0.002} onSingleBetPlace={this.handleSingleBetPlace}/>
        <BettingHistory/>
      </BettingRoot>
    )
  }
}
