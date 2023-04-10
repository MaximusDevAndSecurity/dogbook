import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from "axios"
const Editpage = ({dogs, setDogs}) => {
    const {id} = useParams()
    const [dog, setDog] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [name, setName] = useState('')
    const [nickname, setNickname] = useState('')
    const [age, setAge] = useState('')
    const [bio, setBio] = useState('')
    const [online, setOnline] = useState(dog.online)
    const [friend, setFriend] = useState('')
    const [displayListOfPossibleFriends, setDisplayListOfPossibleFriends] = useState(false)
    const [listOfPossibleFriends, setListOfPossibleFriends] = useState([])
  
   function getRightFriendList(dog) {
    //first add all dogs to the list of possible friends, then remove the current dog and the dogs that are already friends with the current dog
    const newListOfPossibleFriends = []
    dogs.map((dog) => {
        newListOfPossibleFriends.push(dog.name)
    })
    const dogIndex = newListOfPossibleFriends.findIndex((dog) => dog === id)
    newListOfPossibleFriends.splice(dogIndex, 1)
    dog.friends.map((friend) => {
        const friendIndex = newListOfPossibleFriends.findIndex((dog) => dog === friend)
        newListOfPossibleFriends.splice(friendIndex, 1)
    })
    setListOfPossibleFriends(newListOfPossibleFriends)
    }
    useEffect(() => {
        dogs.map((dog) => {
            if (dog.name === id) {
                setDog(dog)
                getRightFriendList(dog)
                setIsLoading(false)
            }
        })
    }, [])

//handle changes to dog
const handleNameChange = (e) => {
    setDog({...dog, name: e.target.value})
    setName(e.target.value)
}
const handleNicknameChange = (e) => {
    setNickname(e.target.value)
    setDog({...dog, nickname: e.target.value})
}
const handleAgeChange = (e) => {
    setAge(e.target.value)
    setDog({...dog, age: e.target.value})
}
const handleBioChange = (e) => {
    setBio(e.target.value)
    setDog({...dog, bio: e.target.value})
}
const handleOnlineChange = (e) => {
    setOnline(e.target.checked)
    setDog({...dog, online: e.target.checked})
}
const handleDisplayFriends = (e) => {
    e.preventDefault()
    setDisplayListOfPossibleFriends(!displayListOfPossibleFriends)
}

const addFriend = (e) => {
    e.preventDefault()
    // add friend to dog's friend list
    const newFriends = [...dog.friends]
    newFriends.push(e.target.value)
    setDog({...dog, friends: newFriends})
    // remove friend from list of possible friends
    const newListOfPossibleFriends = [...listOfPossibleFriends]
    const friendIndex = newListOfPossibleFriends.findIndex((friend) => friend === e.target.value)
    newListOfPossibleFriends.splice(friendIndex, 1)
    setListOfPossibleFriends(newListOfPossibleFriends)
}

const removeFriend = (e) => {
    e.preventDefault()
    const newFriends = [...dog.friends]
    const friendIndex = newFriends.findIndex((friend) => friend === e.target.value)
    newFriends.splice(friendIndex, 1)
    setDog({...dog, friends: newFriends})
    const newListOfPossibleFriends = [...listOfPossibleFriends]
    newListOfPossibleFriends.push(e.target.value)
    console.log('newListOfPossibleFriends', newListOfPossibleFriends)
    setListOfPossibleFriends(newListOfPossibleFriends)
}
//Save changes to dog in database
const handleSave = () => {
    // find index of dog in dogs array
    const dogIndex = dogs.findIndex((dog) => dog.name === id)
    console.log('dogIndex', dogIndex)
    // create new array with updated dog
    const newDogs = [...dogs]
    newDogs[dogIndex] = dog
    // update dogs array
    setDogs(newDogs)
    // update database
    axios.put(`http://localhost:1337/dogs/${id}`, dog)
    .then((response) => {
    console.log('axios put response', response)
    })
    .catch((error) => {
     console.log('axios put error', error)
    })
}

if (isLoading) {
        return <h1>Loading...</h1>
    }else {
    return (
    <div>
       <Link to={`/profile/${dog.name}`}><button>Back</button></Link>
      <h2>Edit dog</h2>
      <img src={dog.pfp} alt={dog.name} style={{maxHeight: '200px', maxWidth: '200px'}}/>
        <form>
            <label htmlFor="">Name</label>
            <input className='createInput' type="text" value={dog.name} onChange={handleNameChange} />  
            <label htmlFor="">Nickname</label>
            <input className='createInput' type="text" value={dog.nickname} onChange={handleNicknameChange} />
            <label htmlFor="">Bio</label>
            <input className='createInput' type="text" value={dog.bio} onChange={handleBioChange} />
            <label htmlFor="">Age</label>
            <input className='createInput' type="number" value={dog.age} onChange={handleAgeChange} />
            <label htmlFor="">Online</label>
            {dog.online ? <input type="checkbox" checked value={dog.online} onChange={handleOnlineChange} />: <input type="checkbox" value={dog.online} onChange={handleOnlineChange}/>}
            <br />
            <ul style={{padding: '10px', fontStyle: 'revert'}}>Friends of {dog.name}: { // map over friends array and display name
      dog.friends.map((name) => {
        return <li style={{listStyle: 'none', marginTop: '7px'}} key={name}>{name} <button value={name} onClick={removeFriend} className='button'>X</button></li>
      })}
      <br />
      <br />
      <button onClick={handleDisplayFriends} >Add friends</button>
        {displayListOfPossibleFriends && <ul style={{padding: '10px', fontStyle: 'revert'}}> { // map over dogs array and display name
        listOfPossibleFriends.map((dog) => {
            return (
                <div>
            <li style={{listStyle: 'none', marginTop: '7px'}} key={dog}>{dog}<button value={dog} onClick={addFriend} className='button'>Add</button></li>
            </div>
            )
        })}
        </ul>}
        </ul>
        </form>
        <Link to={`/profile/${dog.name}`}><button onClick={handleSave}>SAVE</button></Link>
    </div>
  )
}
}
export default Editpage
