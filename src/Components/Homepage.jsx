import {  Link } from "react-router-dom"
import axios from "axios"

const Homepage = ({dogs, setDogs}) => {
  // base const for app

//Delete dog handler
const deleteHandler = async (dog) => {
  console.log('axios delete request', dog)
  const response = await axios.delete(`http://localhost:1337/dogs/${dog.name}`)
  console.log('axios delete response', response)
  const newDogs = response.data
  setDogs(newDogs)
  console.log('after delete', newDogs)
}
   return (
    <div >
        <h2>Dogs</h2>
        <ul style={{listStyle: 'none'}}>
        { dogs.map((dog) => {  
          //style each dog in the list depending on if they are online or not
          return (
            <li key={dog.name}  >
              <Link className={(dog.online ? 'green' : 'red')} to={`/profile/${dog.name}`}>@{dog.name}</Link>
              <button style={{marginLeft: '5px', borderRadius: '10px', borderStyle: 'none'}} onClick={() => deleteHandler(dog)}>X</button>
            </li>
          )
        })}
      </ul>
     <Link to={'/create'}><button style={{backgroundColor: 'lightblue', borderRadius: '5px', borderStyle: 'none'}}>add dog</button></Link>
    </div>
  )
}
export default Homepage


