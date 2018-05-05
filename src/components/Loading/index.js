import React from 'react'
import {Icon} from 'antd'

class Loading extends React.Component {
  render () {
    return (
      <div className='loading-wrapper'>
        <div className='icon'><Icon type="loading" /></div>
        <div className='text'>Loading...</div>
      </div>
    )
  }
}

export default Loading
