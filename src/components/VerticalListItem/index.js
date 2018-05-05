import React from 'react'
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
    const {title, subtitle, extra, thumbUrl, number, cropped, rating, ratingCount} = this.props
    return (
      <div className='vertical-list-item-wrapper'>
        <div className='number'>{number}</div>
        <List.Item>
          <List.Item.Meta
            avatar={<img {...cropped && {className: 'cropped'}} src={thumbUrl} />}
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

export default VerticalListItem
