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
console.log('database', db.data.dogs)
//request handlers
app.get('/dogs', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(db.data.dogs)
})
// Post dog pfp to dog object
app.post('/dogs', (req, res) => {
    db.read()
    res.header("Access-Control-Allow-Origin", "*");
    const pfp = req.body.pfp
    db.data.dogs.find(dog => dog.name === 'Fido').pfp = pfp
    console.log('server', req.body.pfp)
    console.log('server', db.data.dogs)
    res.send(db.data.dogs)
    db.write()

})

export { app }