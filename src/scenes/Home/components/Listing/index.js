import React from 'react'
import ReactDOM from 'react-dom'
import R from 'ramda'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchTop100FreeApps} from 'data/freeApps/actions'
import {fetchAppDetail} from 'data/appDetail/actions'
import {List} from 'antd'
import VerticalListItem from 'components/VerticalListItem'
import InfiniteScroll from 'react-infinite-scroller'
import Recommendation from './components/Recommendation'
import dataHelper from 'helpers/dataHelper'
import {getFilteredFreeApps} from 'data/freeApps/selectors'
import {getSearchInputValue} from 'data/ui/globalSearch/selectors'
const pageSize = 10

class Listing extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      dataSource: [],
      loading: false,
      hasMore: true
    }
    this.startLoading = this.startLoading.bind(this)
    this.stopLoading = this.stopLoading.bind(this)
    this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this)
    this.getAppDetailFromAppId = this.getAppDetailFromAppId.bind(this)
  }

  componentDidMount() {
    this.startLoading()
    this.getFreshData()
  }

  componentWillReceiveProps (nextProps) {
    if (!R.equals(nextProps.globalSearchInputValue, this.props.globalSearchInputValue)) {
      this.resetDataSource(this.getFreshData)
    }
  }

  getFreshData () {
    this.startLoading()
    this.getDataSource().then((dataSource) => {
      this.stopLoading()
      this.setState({
        dataSource: dataSource,
        hasMore: true
      })
    })
  }

  resetDataSource (callback) {
    this.setState({dataSource: []}, callback)
  }

  getDataSource () {
    const dataCount = R.length(this.state.dataSource)
    const dataSource = R.slice(dataCount, dataCount + pageSize)(this.props.freeApps)
    return this.getAppDetails(dataSource).then(() => {
      return Promise.resolve(dataSource)
    })
  }

  getAppDetails (apps) {
    return Promise.all(
      R.map(app => {
        const appId = dataHelper.getAppIdFromItem(app)
        const appDetail = this.getAppDetailFromAppId(appId)
        if (appDetail) {
          return Promise.resolve()
        }
        return this.props.fetchAppDetail(appId)
      })(apps)
    )
  }

  getAppDetailFromAppId (appId) {
    return R.view(R.lensProp(appId))(this.props.appDetail)
  }

  getUserRatingFromAppId (appId) {
    return R.compose(
      R.view(R.lensProp('averageUserRating')),
      this.getAppDetailFromAppId
    )(appId) || 0
  }

  getUserRatingCountFromAppId (appId) {
    return R.compose(
      R.view(R.lensProp('userRatingCount')),
      this.getAppDetailFromAppId
    )(appId) || 0
  }

  startLoading () {
    this.setState({loading: true})
  }

  stopLoading () {
    this.setState({loading: false})
  }

  handleInfiniteOnLoad () {
    this.startLoading()
    let dataSource = this.state.dataSource
    if (dataSource.length === this.props.freeApps.length) {
      this.stopLoading()
      this.setState({
        hasMore: false,
      })
      return
    }
    this.getDataSource().then((dataSource) => {
      this.stopLoading()
      this.setState({
        dataSource: R.concat(this.state.dataSource)(dataSource)
      })
    })
  }

  renderFooter () {
    if (this.state.hasMore) {
      return <div className='footer'>{this.state.loading ? 'Loading...' : 'Loaded'}</div>
    }
    return <div className='footer'>No more to show</div>
  }

  isIndexEven (index) {
    return (index + 1) % 2 === 0
  }

  render () {
    return (
      <div
        className='vertical-list-wrapper'>
        <InfiniteScroll
          footer={this.state.loading ? <div style={{backgroundColor: 'yellow', height: 100, width: '100%'}}>Loading...</div> : <div>Loaded</div>}
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <Recommendation />
          <List
            className='app-list'
            dataSource={this.state.dataSource}
            renderItem={(item, index) => {
              const appId = dataHelper.getAppIdFromItem(item)
              return (
                <VerticalListItem
                  number={index + 1}
                  rating={this.getUserRatingFromAppId(appId)}
                  ratingCount={this.getUserRatingCountFromAppId(appId)}
                  {...this.isIndexEven(index) && {cropped: true}}
                  key={appId}
                  title={dataHelper.getNameFromItem(item)}
                  subtitle={dataHelper.getCategoryFromItem(item)}
                  extra={'extra'}
                  thumbUrl={dataHelper.getThumbUrlFromItem(item)} />
              )
            }}
          >
          </List>
          {this.renderFooter()}
        </InfiniteScroll>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    freeApps: getFilteredFreeApps(state),
    appDetail: state.data.appDetail,
    globalSearchInputValue: getSearchInputValue(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchTop100FreeApps,
    fetchAppDetail
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing)
