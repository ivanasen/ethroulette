import React from 'react'
import RouletteContract from '../build/contracts/Roulette.json'
import getWeb3 from './utils/getWeb3'
import CssBaseline from '@material-ui/core/CssBaseline'
import styled from 'styled-components'
// import {Drizzle, generateStore} from 'drizzle'

import ThemeProvider from './components/ThemeProvider'
import Header from './components/Header'
import BettingScreen from './screens/BettingScreen'

const AppContainer = styled.div `
  background: #37474F;
`
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      accountAddress: null,
      accountBalance: 0,
      storageValue: 0,
      web3: null,
      roulette: null
    }
  }

  updateAccountProps = (account) => {
    this.setState({accountAddress: account})
    this
      .state
      .web3
      .eth
      .getBalance(account, (err, balance) => {
        if (err) {
          console.error('Error fetching account balance.')
        } else {
          const balanceEth = balance.toNumber() / Math.pow(10, 18)
          this.setState({accountBalance: balanceEth})
        }
      })
  }

  componentWillMount() {
    // Get network provider and web3 instance. See utils/getWeb3 for more info.

    getWeb3.then(results => {
      this.setState({web3: results.web3})

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    }).catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const roulette = contract(RouletteContract)
    this.setState({ roulette })
    roulette.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var rouletteInstance

    // Get accounts.
    this
      .state
      .web3
      .eth
      .getAccounts((error, accounts) => {
        this.updateAccountProps(accounts[0])

        roulette
          .deployed()
          .then((instance) => {
            rouletteInstance = instance

            // Stores a given value, 5 by default. return simpleStorageInstance.set(5,
            // {from: accounts[0]})
          })
        // .then((result) => { Get the value from the contract to prove it worked.
        // return rouletteInstance     .get     .call(accounts[0]) }) .then((result) =>
        // { Update state with the result.   return this.setState({storageValue:
        // result.c[0]}) })
      })
  }

  handleSingleBetPlace(betUnit, number) {
    let rouletteInstance = null

    this.state.roulette
    .deployed()
    .then((instance) => {
      rouletteInstance = instance

      
    })

  }

  render() {
    return (
      <CssBaseline>
        <ThemeProvider>
          <AppContainer>
            <Header
              balance={this.state.accountBalance}
              accountAddress={this.state.accountAddress}/>

            <BettingScreen onSingleBetPlace={this.handleSingleBetPlace}/>
          </AppContainer>
        </ThemeProvider>
      </CssBaseline>
    );
  }
}

export default App
