import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Listing from './components/Listing'
import GlobalSearch from './components/GlobalSearch'
import {fetchTop100FreeApps} from 'data/freeApps/actions'
import {fetchTopGrossingApps} from 'data/topGrossingApps/actions'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    return Promise.all([
      this.props.fetchTop100FreeApps(),
      this.props.fetchTopGrossingApps()
    ]).then(() => {
      this.setState({loading: false})
    })
  }

  renderLoading () {
    return <div>Loading.......</div>
  }

  renderHome () {
    return (
      <div>
        <GlobalSearch />
        <Listing />
      </div>
    )
  }

  render () {
    if (this.state.loading) {
      return this.renderLoading()
    }
    return this.renderHome()
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchTop100FreeApps,
    fetchTopGrossingApps
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Home)
