import React from 'react'
import PropTypes from 'prop-types'

class NoDataFill extends React.Component {
  render () {
    const {fillText, height} = this.props
    return (
      <div className='no-data-fill' style={{height}}>
        {fillText}
      </div>
    )
  }
}

NoDataFill.propTypes = {
  height: PropTypes.number.isRequired,
  fillText: PropTypes.string.isRequired
}

export default NoDataFill
