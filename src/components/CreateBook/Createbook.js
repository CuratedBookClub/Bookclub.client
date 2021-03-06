import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import './CreateBook.styles.scss'
import S3 from 'react-aws-s3'

const CreateBook = ({ user }) => {
  const [book, setBook] = useState({})
  const [postId, setPostId] = useState('')
  const access = process.env.REACT_APP_ACCESS_KEY
  const secret = process.env.REACT_APP_SECRET_KEY
  const config = {
    bucketName: 'curatedbookclub',
    region: 'us-east-2',
    secretAccessKey: secret,
    accessKeyId: access
  }
  const ReactS3Client = new S3(config)

  const handleChange = (event) => {
    event.persist()
    setBook((prevPost) => {
      const updatedPost = { [event.target.name]: event.target.value }
      const editedPost = Object.assign({}, prevPost, updatedPost)
      return editedPost
    })
  }

  const onFileChange = event => {
    console.log(event.target.files)
    const file = event.target.files[0]
    ReactS3Client
      .uploadFile(file)
      .then((data) => {
        setBook((prevPost) => {
          const updatedPost = { bookImage: data.location }
          const editedPost = Object.assign({}, prevPost, updatedPost)
          return editedPost
        })
      }
      )
      .catch((err) => {
        alert(err)
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
        <input type="file" onChange={onFileChange} />
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
