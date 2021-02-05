import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.styles.scss'

const Footer = () => {
  return (
    <div className="footer">
      <div>
        Curated Book Club
        <br /><Link to="/book-index">Books</Link>
        <br /><Link to="/about">About</Link>
      </div>
      <div>
        Social
        <br /><a href="https://www.instagram.com" target="blank">Instagram</a>
      </div>
      <div>
        Subscribe
        <br />Email
      </div>
    </div>
  )
}

export default Footer
