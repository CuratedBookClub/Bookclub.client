import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.styles.scss'

const Footer = () => {
  return (
    <div className="footer">
      <div>
        Curated Book Club
        <br /><Link className="footerLink" to="/book-index">Books</Link>
        <br /><Link className="footerLink" to="/about">About</Link>
      </div>
      <div>
        Social
        <br /><a href="https://www.instagram.com" className="footerLink" target="blank">Instagram</a>
      </div>
      <div>
        Subscribe
        <br />Email
      </div>
    </div>
  )
}

export default Footer
