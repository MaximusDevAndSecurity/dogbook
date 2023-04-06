import { useNavigate, Link } from "react-router-dom"
const Homepage = ({dogs}) => {


  return (
    <div >
        <h2>Dogs</h2>
        <ul style={{listStyle: 'none'}}>
        {dogs.map((dog) => {  
          return (
            <li key={dog.name}>
              <Link to={`/profile/${dog.name}`}>@{dog.name}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}


export default Homepage


