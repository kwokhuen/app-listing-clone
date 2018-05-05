import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input} from 'antd'
import {setGlobalSearchInputValue} from 'data/ui/globalSearch/actions'
const Search = Input.Search

class GlobalSearch extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    const value = e.target.value
    this.props.setGlobalSearchInputValue(value)
  }

  render () {
    return (
      <div className='global-search-wrapper'>
        <Search
          className='search-input'
          placeholder='搜尋'
          onChange={this.onChange} />
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setGlobalSearchInputValue
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(GlobalSearch)
