import React from 'react'
import {Button, Typography} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components'

const RouletteRoot = styled.div `
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 80px;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
`

const Title = styled(Typography)`
  color: white !important;
  margin: 20px auto !important;
`;

const ButtonBar = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const MarginButton = styled(Button)`
  margin: 10px 30px !important;
`

const BetUnit = styled(Typography)`
  background: rgba(0, 0, 0, 0.2);
  padding: 20px;
  color: white !important;  
  margin: 10px !important;
`

class BettingRoulette extends React.Component {
  constructor(props) {
    super(props)

    this.rouletteNumbers = [...Array(37).keys()]
    this.state = {
      betUnit: props.betUnit,
      betNumber: 0
    }
  }

  handleSingleBetPlace = () => {
    this
      .props
      .onSingleBetPlace(this.state.betUnit, this.state.betNumber)
  }

  handleEvenBetPlace = () => {
    this
      .props
      .onEvenBetPlace(this.state.betUnit)
  }

  handleOddBetPlace = () => {
    this
      .props
      .onOddBetPlace(this.state.betUnit)
  }

  handleReset = () => {
    this.setState({betUnit: this.props.betUnit, betNumber: 0})
  }

  handleChange = name => event => {
    switch (name) {
      case 'betUnit':
        {
          if (event.target.value >= 0) {
            this.setState({[name]: event.target.value})
          }

          break;
        }
      case 'betNumber':
        {
          this.setState({[name]: event.target.value})

          break;
        }
    }
  };

  render() {
    return (
      <RouletteRoot>
        <Title variant="display1">Welcome to EthRoulette!</Title>

        {/* <TextField
          select
          label="Bet on a single number"
          value={this.state.betNumber}
          InputLabelProps={{
          shrink: true
        }}
          margin="normal">
          {this
            .rouletteNumbers
            .map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
        </TextField> */}

        <TextField
          select
          label="Bet on a number"
          value={this.state.betNumber}
          onChange={this.handleChange('betNumber')}
          helperText="Please select your currency"
          margin="normal">
          {this
            .rouletteNumbers
            .map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          label="Bet Unit"
          value={this.state.betUnit}
          type="number"
          onChange={this.handleChange('betUnit')}
          InputLabelProps={{
          shrink: true
        }}
          margin="normal"/>

        <MarginButton variant="contained" color="secondary" onClick={this.handleEvenBetPlace}>
          Even Bet
        </MarginButton>

        <MarginButton variant="contained" color="secondary" onClick={this.handleOddBetPlace}>
          Odd Bet
        </MarginButton>

        <ButtonBar>
          <MarginButton variant="contained" color="secondary" onClick={this.handleReset}>
            Reset Bet
          </MarginButton>
          <MarginButton
            variant="contained"
            color="secondary"
            onClick={this.handleSingleBetPlace}>
            Place Bet
          </MarginButton>
        </ButtonBar>
      </RouletteRoot>
    )
  }
}

export default BettingRoulette
