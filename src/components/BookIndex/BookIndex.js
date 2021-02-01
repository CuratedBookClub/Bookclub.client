import React, { useEffect, useState } from 'react'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import './BookIndex.styles.scss'

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
      <div className="book-card" key={book._id}>
        <h2>{book.title}</h2>
        <h4>{book.bookImage}</h4>
        <h4>{book.link}</h4>
        <h4>{book.rating}</h4>
        <p>{book.review}</p>
      </div>
    )
  })

  return (
    <div>
      <h1>This is the books page</h1>
      {booksjsx}
    </div>
  )
}

export default BookIndex
