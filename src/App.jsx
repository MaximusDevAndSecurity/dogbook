import { useState, useEffect } from "react";
import {
  Routes, Route,
} from "react-router-dom";
import Homepage from "./Components/Homepage";
import axios from "axios";
import Profilepage from "./Components/Profilepage";
import Createpage from "./Components/Createpage";
import Editpage from "./Components/Editpage";
//Todo!!! Fix friends list to show all dogs except the current dog and if dog is already friends with them

function App() {
  // base const for app
  const databaseURL = "http://localhost:1337/dogs"
  const [dogs, setDogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // get dogs from database
useEffect(() => {
  const getDogs = async () => {
    axios.get(databaseURL)
    const response = await axios.get(databaseURL)
    setDogs(response.data)
    setIsLoading(false)
  }
  getDogs()
}, [])

if (isLoading) {
  return <h1>Loading...</h1>
}
else {

  return (
    <div>
      <h1>Dogbook</h1>
      <Routes>
        <Route path="/" element={<Homepage  dogs={dogs} setDogs={setDogs} />} />
        <Route path='/profile/:id' 
        element={<Profilepage  dogs={dogs} setDogs={setDogs}  />}
         />
         <Route path='/create' element={<Createpage dogs={dogs} setDogs={setDogs} />} />
         <Route path="/edit/:id" element={<Editpage dogs={dogs} setDogs={setDogs} />}/>
      </Routes>
    </div>
  )
}
}

export default  App
