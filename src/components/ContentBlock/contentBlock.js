import React from 'react'
import './contentBlock.styles.scss'

const Content = ({ image, blurb }) => {
  return (
    <div className="contentContainer">
      <div className="imageContainer">
        <img className="imageSize" src={image}></img>
      </div>
      <div className="blurb">{blurb}</div>
    </div>
  )
}

export default Content
