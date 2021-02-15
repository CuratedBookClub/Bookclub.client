import React from 'react'
import Ralph from '../../IMG_3857.jpg'
import Samantha from '../../Samantha.png'
import ContentBlock from '../ContentBlock/contentBlock'
import './Home.styles.scss'

const Home = () => {
  const text = 'Hi my name is Ralph'
  return (
    <div className="homeContainer">
      <div className="homeLeftPane">
        <div className="photoContainer">
          <img className="SamanthaImage" src={Samantha}></img>
        </div>
        <div className="blurbContainer">
          <h2>hi there! so excited you stopped by!</h2>
          <p>I’m Samantha, the twentysomething travel planner, blogger, and designer behind the curated adventure. I currently live in Massachusetts with my husband and spoiled cat, Sansa.</p>

          <p>I started this journey in 2018, when a friend asked me to help plan her vacation to Europe. After a few more requests, I realized that this is something I was good at, and I really LOVED doing. At the beginning of 2019, I became a certified travel agent specializing in Disney destinations, European getaways, and tropical adventures.</p>

          <p>On any given day, you can probably find me with a dozen tabs open, writing a blog post about my latest travel idea, and enjoying an afternoon cup of tea. I love spending time exploring new places, trying new snacks in Disney, and indulging in the obligatory weekly run to Target.</p>
        </div>
      </div>
      <div className="homeRightPane">
        <ContentBlock image={Ralph} blurb={text} />
        <ContentBlock image={Ralph} blurb={text} />
        <ContentBlock image={Ralph} blurb={text} />
        <ContentBlock image={Ralph} blurb={text} />
      </div>
    </div>
  )
}

export default Home
