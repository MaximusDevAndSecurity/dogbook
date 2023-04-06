import { useState, useEffect } from "react";
import {
  Routes, Route,
  useParams,
  useNavigate
} from "react-router-dom";
import Homepage from "./Components/Homepage";
import axios from "axios";
import Profilepage from "./Components/Profilepage"; 
//Todo add edit page

function App() {
  // base const for app
  const urlPFP = "https://dog.ceo/api/breeds/image/random"
  const databaseURL = "http://localhost:1337/dogs"
  const [dogs, setDogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pfp, setPfp] = useState([])
  
  // get pfp from api and send to database
  /*
  const getPfp = async () =>{
    await axios.get(urlPFP)
    .then((response) => {
      setPfp(response.data.message)
      console.log('get pfp', pfp)
      axios.post(databaseURL, {
        pfp: response.data.message
      }
          )
      .then((response) => {
        console.log('post pfp', pfp)
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    })
  }
  */
  
  // get dogs from database
  const getDogs =  () => {
     axios.get(databaseURL)
      .then((response) => {
        setDogs(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      }
      )
}

  useEffect(() => {
   // getPfp()
    getDogs()
  }, [])

console.log('app pfp',pfp)
console.log('app Dogos',dogs)

if (isLoading) {
  return <h1>Loading...</h1>
}else {

  return (
    <div>
      <h1>Dogbook</h1>
      <Routes>
        <Route path="/" element={<Homepage dogs={dogs} />} />
        <Route path='/profile/:id' 
        element={<Profilepage  dogs={dogs}  />}
         />
      </Routes>
    </div>
  )
}
}

export default  App
