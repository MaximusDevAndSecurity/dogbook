import { useState, useEffect } from "react";
import {
  Routes, Route,
  useParams,
  useNavigate
} from "react-router-dom";
import Homepage from "./Components/Homepage";
import axios from "axios";
import Profilepage from "./Components/Profilepage"; 

function App() {
  const urlPfp = "https://dog.ceo/api/breeds/image/random"
  const databaseURL = "http://localhost:1337/dogs"
  const [dogs, setDogs] = useState([])
  const [pfp, setPfp] = useState([])
  useEffect(() => {
    axios.get(databaseURL)
      .then((response) => {
        setDogs(response.data)
      })
  }, [])

  

  console.log('dogs', dogs)

  return (
    <div>
      <h1>Dogbook</h1>
      <Routes>
        <Route path="/" element={<Homepage dogs={dogs} />} />
        <Route path='/profile/:id' element={<Profilepage dogs={dogs} />}
         />
      </Routes>
    </div>
  )
}

export default  App
