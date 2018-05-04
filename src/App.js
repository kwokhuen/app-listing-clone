import React from 'react'
import Routes from './routes'
import store from './store'
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      rehydrated: false
    }
  }

  componentWillMount () {
    persistStore(store, {}, () => {
      console.log('DEBUG store', store)
      this.setState({rehydrated: true})
    })
  }

  render () {
    if (!this.state.rehydrated) {
      return <div />
    }
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}

export default App
