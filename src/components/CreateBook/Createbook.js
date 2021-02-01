import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import './CreateBook.styles.scss'

const CreateBook = ({ user }) => {
  console.log(user.token)
  const [book, setBook] = useState({})
  const [postId, setPostId] = useState('')
  const handleChange = (event) => {
    event.persist()
    setBook((prevPost) => {
      const updatedPost = { [event.target.name]: event.target.value }
      const editedPost = Object.assign({}, prevPost, updatedPost)
      return editedPost
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/books/`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      data: { book }
    })
      .then((res) => setPostId(res.data.book._id))
      .then(() => setBook({}))
      .then(() => console.log(postId + ' created succesfully'))
  }
  return (
    <div>
      <form className="createBookContainer" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input name="title" type="text" id="booktitle" className="bookinput" placeholder="Title of the Book" onChange={handleChange}></input>
        <label>Book Image:</label>
        <input name="bookImage" type="text" id="image" className="bookinput" placeholder="Upload the book Image" onChange={handleChange}></input>
        <label>Link:</label>
        <input name="link" type="text" id="booklink" className="bookinput" placeholder="Link to the Book" onChange={handleChange}></input>
        <label>Rating:</label>
        <input name="rating" type="number" id="bookrating" min={0} max={10} className="bookinput" placeholder="Rating of the Book" onChange={handleChange}></input>
        <label>Review:</label>
        <textarea name="review" type="text" rows={10} className="bookinput" placeholder="Book Review" onChange={handleChange}></textarea>
        <button type="submit">Create Book!</button>
      </form>
    </div>
  )
}

export default CreateBook
