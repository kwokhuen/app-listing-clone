import React from 'react'
import PropTypes from 'prop-types'
import ReactStars from 'react-stars'
import {List} from 'antd'
import Ellipsis from 'ant-design-pro/lib/Ellipsis'

class VerticalListItem extends React.Component {
  renderStarRating (rating) {
    return (
      <ReactStars
        half
        value={rating}
        count={5}
        size={14}
        edit={false}
        color2='#fd9427' />
    )
  }
  render () {
    const {title, subtitle, thumbUrl, number, cropped, rating, ratingCount} = this.props
    return (
      <div className='vertical-list-item-wrapper'>
        <div className='number'>{number}</div>
        <List.Item>
          <List.Item.Meta
            avatar={<img {...cropped && {className: 'cropped'}} src={thumbUrl} alt={title} />}
            title={<Ellipsis lines={1}>{title}</Ellipsis>}
            description={<div>
              <div>{subtitle}</div>
              <div className='rating-wrapper'>
                {this.renderStarRating(rating)}
                <span className='count'>({ratingCount})</span>
              </div>
            </div>}
          />
        </List.Item>
      </div>
    )
  }
}

VerticalListItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  thumbUrl: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  cropped: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired
}

VerticalListItem.defaultProps = {
  cropped: false
}

export default VerticalListItem
