import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
const Profilepage = ({dogs}) => {
  const [dog, setDog] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [friendIndex, setFriendIndex] = useState(0)
//get id from url
let {id} = useParams()

// on render
useEffect(() => {
  // display the right dog based on id (name of the dog)
 dogs.map((dog) => {
  if (dog.name === id) {
    setDog(dog)
    setIsLoading(false)
  }})
  
}, [])


if (isLoading) {
   return <h1>Loading...</h1>
} else {
  return (
    <div>
    <Link to="/">Edit</Link>
    <h2>Profile</h2>
    <img src={dog.pfp} alt={dog.name} style={{maxHeight: '200px', maxWidth: '200px'}}/>
    <h4>Name: {dog.name}</h4>
    <h4>Nickname: {dog.nickname}</h4>
<p>description: {dog.bio}</p>
    <h4>Age: {dog.age}</h4>
  <ul>Friends: 
      { // map over friends array and display name
      dog.friends.map(({name}) => {
        return <li key={name}>{name}</li>
      })}
  </ul>
    </div>
  )
}
}
  export default Profilepage
