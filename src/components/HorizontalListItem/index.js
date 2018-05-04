import React from 'react'
import Ellipsis from 'ant-design-pro/lib/Ellipsis'

class HorizontalListItem extends React.Component {
  render () {
    const {thumbUrl, title, subtitle} = this.props
    return (
      <div className='horizontal-list-item-wrapper'>
        <div className='thumbnail'><img src={thumbUrl} /></div>
        <div className='title'><Ellipsis lines={2}>{title}</Ellipsis></div>
        <div className='subtitle'>{subtitle}</div>
      </div>
    )
  }
}

export default HorizontalListItem
