// Imports
import express from 'express'
import * as url from 'url';
import db from './database.js';
import cors from 'cors';
// Konfiguration
const app = express()
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const staticPath = url.fileURLToPath(new URL('../static', import.meta.url))



// Middleware
const logger = (req, res, next) => {
    console.log(`${req.method}  ${req.url}`, req.body)
    next()
}
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(logger)
app.use(express.static(staticPath))

//request handlers
app.get('/dogs', (req, res) => {
    db.read()
    res.header("Access-Control-Allow-Origin", "*");
    res.send(db.data.dogs)
})
// Post dog pfp to dog object
app.post('/dogs', (req, res) => {
    db.read()
    res.header("Access-Control-Allow-Origin", "*");
    const dog = req.body
    db.data.dogs.push(dog)
    db.write()
})
// delete dog :(
app.delete('/dogs/:name', (req, res) => {
    db.read()
    //if the deleted dog is in friend list, remove it
    db.data.dogs.forEach(dog => {
        if (dog.friends.includes(req.params.name)) {
            dog.friends = dog.friends.filter(friend => friend !== req.params.name)
        }
    })
    const name = req.params.name
    db.data.dogs = db.data.dogs.filter(dog => dog.name !== name)
    db.write()
    res.send(db.data.dogs)
})
// Put dog pfp to dog object
app.put('/dogs/:name', (req, res) => {
    db.read()
    const name = req.params.name
    db.data.dogs = db.data.dogs.map(dog => dog.name === name ? { ...dog, ...req.body } : dog)
    db.write()
    res.send(db.data.dogs)
})

export { app }