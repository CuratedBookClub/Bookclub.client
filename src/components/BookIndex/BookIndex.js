import React, { useEffect, useState } from 'react'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import './BookIndex.styles.scss'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Moment from 'react-moment'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const BookIndex = ({ user }) => {
  const [books, setBooks] = useState([])
  const [show, setShow] = useState(false)
  const [bookId, setBookId] = useState('')
  const [editShow, setEditShow] = useState(false)
  const [book, setBook] = useState({})

  useEffect(() => {
    axios({
      url: `${apiUrl}/books`,
      method: 'GET'
    })
      .then(res => setBooks(res.data.books))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/books/${book._id}`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      data: { book }
    })
      .then(() => setBook({}))
      .then(() => {
        axios({
          url: `${apiUrl}/books`,
          method: 'GET'
        })
          .then(res => setBooks(res.data.books))
      })
      .then(() => {
        setEditShow(false)
      })
  }

  const handleChange = (event) => {
    event.persist()
    setBook((prevPost) => {
      const updatedPost = { [event.target.name]: event.target.value }
      const editedPost = Object.assign({}, prevPost, updatedPost)
      return editedPost
    })
  }

  const handleEditClick = (book) => {
    setBook(book)
    setEditShow(true)
  }

  const handleDeleteClick = (event) => {
    setBookId(event.target.id)
    setShow(true)
  }

  const handleDeleteConfirm = () => {
    axios({
      url: `${apiUrl}/books/${bookId}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(() => {
        axios({
          url: `${apiUrl}/books`,
          method: 'GET'
        })
          .then(res => setBooks(res.data.books))
      })
      .then(() => {
        setShow(false)
      })
  }

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
            {user ? <button name={book._id} onClick={() => handleEditClick(book)}>Edit</button> : ''}
            {user ? <button id={book._id} onClick={handleDeleteClick}>Delete</button> : ''}
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
      <div>
        <Modal show={show}>
          <Modal.Header>Are you sure you want to delete this book?</Modal.Header>
          <Button variant="success" onClick={handleDeleteConfirm}>Confirm</Button>
          <Button variant="danger" onClick={() => setShow(false)}>Cancel</Button>
        </Modal>
      </div>
      <div>
        <Modal show={editShow}>
          <Modal.Header>Edit</Modal.Header>
          <form className="createBookContainer" onSubmit={handleSubmit}>
            <label>Title:</label>
            <input name="title" type="text" id="booktitle" className="bookinput" value={book.title} onChange={handleChange}></input>
            <label>Book Image:</label>
            <img src={book.bookImage} />
            <label>Link:</label>
            <input name="link" type="text" id="booklink" className="bookinput" value={book.link} onChange={handleChange}></input>
            <label>Rating:</label>
            <input name="rating" type="number" id="bookrating" min={0} max={10} className="bookinput" value={book.rating} onChange={handleChange}></input>
            <label>Review:</label>
            <textarea name="review" type="text" rows={10} className="bookinput" value={book.review} onChange={handleChange}></textarea>
            <button type="submit">Edit Book!</button>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default BookIndex
