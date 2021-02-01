import React, { useEffect, useState } from 'react'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import './BookIndex.styles.scss'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Moment from 'react-moment'

const BookIndex = () => {
  const [books, setBooks] = useState([])
  useEffect(() => {
    axios({
      url: `${apiUrl}/books`,
      method: 'GET'
    })
      .then(res => setBooks(res.data.books))
  }, [])

  const booksjsx = books.map(book => {
    return (
      <Accordion defaultActiveKey="0" key={book._id}>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          <div className="book-card" key={book._id}>
            <div className="bookImageContainer">
              <img className="book-image" src={book.bookImage} alt="bookImage" />
            </div>
            <h4>{book.title}</h4>
            <Moment format="MM-DD-YYYY"><h4>{book.createdAt}</h4></Moment>
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <h4>{book.title}</h4>
            <h4>{book.rating}</h4>
            <p>{book.review}</p>
            <p>{book.link}</p>
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
    )
  })

  return (
    <div>
      <h1>This is the books page</h1>
      <div className="book-grid">
        {booksjsx}
      </div>
    </div>
  )
}

export default BookIndex
