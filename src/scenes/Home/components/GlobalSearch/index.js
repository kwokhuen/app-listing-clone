import React from 'react'
import {Input} from 'antd'
const Search = Input.Search

class GlobalSearch extends React.Component {
  render () {
    return (
      <div className='global-search-wrapper'>
        <Search
          className='search-input'
          placeholder="Search"
          onChange={e => console.log(e.target.value)} />
      </div>
    )
  }
}

export default GlobalSearch
