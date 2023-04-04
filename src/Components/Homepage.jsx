import { useNavigate } from "react-router-dom"
const Homepage = ({dogs}) => {
const navigate = useNavigate()
    
  return (
    <div >
        <h2>Dogs</h2>
        <ul style={{listStyle: 'none'}}>
        {dogs.map((dog) => {
        return (
          <a onClick={() => navigate(`/profile/${dog.name}`)}><li>
            @{dog.name}
          </li></a>
        ) 
      })}
      </ul>
    </div>
  )
}


export default Homepage


