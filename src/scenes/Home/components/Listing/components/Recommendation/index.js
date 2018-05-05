import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import HorizontalListItem from 'components/HorizontalListItem'
import dataHelper from 'helpers/dataHelper'
import {getFilteredTopGrossingApps} from 'data/topGrossingApps/selectors'
import NoDataFill from 'components/NoDataFill'

class Recommendation extends React.Component {
  renderListItem () {
    const {topGrossingApps} = this.props
    return R.map(item => {
      return (
        <HorizontalListItem
          key={dataHelper.getAppIdFromItem(item)}
          thumbUrl={dataHelper.getThumbUrlFromItem(item)}
          title={dataHelper.getNameFromItem(item)}
          subtitle={dataHelper.getCategoryFromItem(item)} />
      )
    })(topGrossingApps)
  }

  render () {
    return (
      <div className='recommendation'>
        <div className='section-title'>
          推介
        </div>
        <div className='horizontal-list-wrapper'>
          {R.isEmpty(this.props.topGrossingApps)
            ? <NoDataFill fillText='No Data' height={167} />
            : this.renderListItem()
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    topGrossingApps: getFilteredTopGrossingApps(state)
  }
}

export default connect(mapStateToProps)(Recommendation)
