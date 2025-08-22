import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FacialExpression from './components/FacialExpression'
import MoodSongs from './components/MoodSongs'
function App() {
   const [Songs, setSongs] = useState([
    { title: "test_title", artist: "test_artist", url: "test_url" },
    { title: "test_title", artist: "test_artist", url: "test_url" },
    { title: "test_title", artist: "test_artist", url: "test_url" }
  ]);

  return (
    <>
    <FacialExpression setSongs={setSongs}/>
    <MoodSongs Songs={Songs}/>
    </>
  )
}

export default App
