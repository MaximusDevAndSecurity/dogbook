import { useParams } from 'react-router-dom'
const Profilepage = ({dogs}) => {
let {id} = useParams()
const dog = dogs.find((dog) => dog.name === id)
console.log('dog', dog)
console.log('id', id)
    return (
      <div>
      <h2>Profile</h2>
        <h4>Name: {dog.name}</h4>
        <p>Description: {dog.description}</p>
      </div>
    )
  }
  
  
  export default Profilepage