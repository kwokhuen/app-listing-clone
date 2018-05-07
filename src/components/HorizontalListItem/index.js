import React from 'react'
import PropTypes from 'prop-types'
import Ellipsis from 'ant-design-pro/lib/Ellipsis'

class HorizontalListItem extends React.Component {
  render () {
    const {thumbUrl, title, subtitle} = this.props
    return (
      <div className='horizontal-list-item-wrapper'>
        <div className='thumbnail'><img src={thumbUrl} alt={title} /></div>
        <div className='title'><Ellipsis lines={2}>{title}</Ellipsis></div>
        <div className='subtitle'>{subtitle}</div>
      </div>
    )
  }
}

HorizontalListItem.propTypes = {
  thumbUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}

export default HorizontalListItem
