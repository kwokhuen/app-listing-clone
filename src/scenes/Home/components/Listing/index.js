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
    this.getDataSource().then((dataSource) => {
      this.stopLoading()
      this.setState({
        dataSource: dataSource
      })
    })
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
        const appId = this.getAppIdFromItem(app)
        return this.props.fetchAppDetail(appId)
      })(apps)
    )
  }

  getAppIdFromItem (item) {
    return R.view(R.lensPath(['id', 'attributes', 'im:id']))(item)
  }

  getNameFromItem (item) {
    return R.view(R.lensPath(['im:name', 'label']))(item)
  }

  getThumbUrlFromItem (item) {
    return R.view(R.lensPath(['im:image', 2, 'label']))(item)
  }

  getCategoryFromItem (item) {
    return R.view(R.lensPath(['category', 'attributes', 'label']))(item)
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
              const appId = this.getAppIdFromItem(item)
              return (
                <VerticalListItem
                  number={index + 1}
                  rating={this.getUserRatingFromAppId(appId)}
                  ratingCount={this.getUserRatingCountFromAppId(appId)}
                  {...this.isIndexEven(index) && {cropped: true}}
                  key={appId}
                  title={this.getNameFromItem(item)}
                  subtitle={this.getCategoryFromItem(item)}
                  extra={'extra'}
                  thumbUrl={this.getThumbUrlFromItem(item)} />
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
    freeApps: state.data.freeApps,
    appDetail: state.data.appDetail
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchTop100FreeApps,
    fetchAppDetail
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing)
