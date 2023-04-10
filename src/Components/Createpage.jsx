import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
//todo fix so you dont have to add a friend to create a dog
//and after created dog render it and display it on the homepage

const Createpage = ({dogs, setDogs}) => {
    const [dog, setDog] = useState({ name: '', nickname: '', age: '', bio: '', friends: [], online: false, pfp: ''})
    // setting the add friends view to false by default
    const [displayListOfPossibleFriends, setDisplayListOfPossibleFriends] = useState(false)
    const [listOfPossibleFriends, setListOfPossibleFriends] = useState([])

    //predetermene the dog pfp to a random dog pfp at the start of the page
    useEffect(() => {
    const newListOfPossibleFriends = []
    axios.get('https://dog.ceo/api/breeds/image/random')
    .then((response) => {
        setDog({ ...dog, pfp: response.data.message })
    })
    .catch((error) => {
        console.log(error)
    })
    dogs.map((dog) => {
        //adding all dogs to the list of possible friends
        newListOfPossibleFriends.push(dog.name)
    })
    //setting the list of possible friends to the new list of possible friends
    setListOfPossibleFriends(newListOfPossibleFriends)
    }, [])

//need to create a dog object with the same elements as the dogs in the database
    const handleChange = (e) => {
     setDog({ ...dog, [e.target.name]: e.target.value, online: e.target.checked })
     console.log(dog, e.target.checked)
    }
    const handleDisplayFriends = (e) => {
        e.preventDefault()
        setDisplayListOfPossibleFriends(!displayListOfPossibleFriends)
    }

    //need to post the dog object to the database
    const handleSubmit = () => {
        //first check if dog name already exists
        const dogName = dog.name[0].toUpperCase() + dog.name.slice(1)
        console.log(dogName)
        if (dogs.some((doggo) => doggo.name === dogName )) {
        alert('Dog name already exists')
        //if above qualification went through, post the dog to the database.
        } else {
        const sendDogToDatabase = async () => {
            const response = await axios.post('http://localhost:1337/dogs', dog)
            setDogs([...dogs, response.data])
        }
            sendDogToDatabase()
        }
    }

    //switch the view to add friends depending on the state of the friendsView
    const addFriend = (e) => {
        e.preventDefault()
        // add friend to dog's friend list
        setDog({ ...dog, friends: [...dog.friends, e.target.value] })
        //remove friend from list of possible friends
        const newListOfPossibleFriends = listOfPossibleFriends.filter((friend) => friend !== e.target.value)
        setListOfPossibleFriends(newListOfPossibleFriends)
    }
  return (
    <div>
        <Link to={'/'}><button>HOME</button></Link>
        <h2>Submit your dog!</h2>
        <form onSubmit={handleSubmit} >
            <label>
                Name:
                <input
                className='createInput'
                required
                 type="text"    
                 name="name"
                 value={dog.name}
                onChange={handleChange}
                 />
            </label>
            <label>
                 Nickname:
                <input 
                className='createInput'
                required
                type="text" 
                name="nickname"
                value={dog.nickname}
                onChange={handleChange}
                />
            </label>
            <label>
                Age:
                <input 
                className='createInput'
                required
                type="number" 
                name="age" 
                value={dog.age}
                onChange={handleChange}
                />
            </label>
            <label>
                Bio:
                <input 
                className='createInput'
                required
                type="text" 
                name="bio"
                value={dog.bio}
                onChange={handleChange}
                />
            </label>
            <label>
                Online? 
                <input
                type="checkbox"
                name="online"
                value={dog.online}
                onChange={handleChange}
                />
            </label>
            <h3>Friends:</h3>{dog.friends.map((name) => {
        console.log('name', name)
        return <li style={{listStyle: 'none', marginTop: '-10px', padding: '2px'}} key={name}>{name}</li>
      })}
             <button onClick={handleDisplayFriends} >Add friends</button>
        {displayListOfPossibleFriends && <ul style={{padding: '10px', fontStyle: 'revert'}}> {
        listOfPossibleFriends.map((dog) => {
            return (
                <div>
            <li style={{listStyle: 'none', marginTop: '7px'}} key={dog.name}>{dog}<button value={dog} className='button' onClick={addFriend} >Add</button></li>
            </div>
            )
        })}
        </ul>}
            <button type="submit" >Submit</button>
        </form>
    </div>
  )
}
export default Createpage