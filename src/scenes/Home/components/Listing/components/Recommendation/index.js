import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import HorizontalListItem from 'components/HorizontalListItem'

class Recommendation extends React.Component {
  getNameFromItem (item) {
    return R.view(R.lensPath(['im:name', 'label']))(item)
  }

  getThumbUrlFromItem (item) {
    return R.view(R.lensPath(['im:image', 2, 'label']))(item)
  }

  getCategoryFromItem (item) {
    return R.view(R.lensPath(['category', 'attributes', 'label']))(item)
  }

  getAppIdFromItem (item) {
    return R.view(R.lensPath(['id', 'attributes', 'im:id']))(item)
  }

  renderListItem () {
    const {topGrossingApps} = this.props
    return R.map(item => {
      return (
        <HorizontalListItem
          key={this.getAppIdFromItem(item)}
          thumbUrl={this.getThumbUrlFromItem(item)}
          title={this.getNameFromItem(item)}
          subtitle={this.getCategoryFromItem(item)} />
      )
    })(topGrossingApps)
  }

  render () {
    return (
      <div className='horizontal-list-wrapper'>
        {this.renderListItem()}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    topGrossingApps: state.data.topGrossingApps
  }
}

export default connect(mapStateToProps)(Recommendation)
