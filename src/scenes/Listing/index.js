import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchTop100FreeApps} from 'data/freeApps/actions'

class Listing extends React.Component {
  componentDidMount () {
    this.props.fetchTop100FreeApps().then(() => {
      console.log('DEBUG R.type(this.props.freeApps)', R.type(this.props.freeApps))
    })
  }

  render () {
    return (
      <div>Listing</div>
    )
  }
}

function mapStateToProps (state) {
  return {
    freeApps: state.data.freeApps
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchTop100FreeApps
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing)
