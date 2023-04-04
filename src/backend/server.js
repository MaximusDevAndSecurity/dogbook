// Imports
import express from 'express'
import * as url from 'url';
import db from './database.js';


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
app.use(express.urlencoded({ extended: true }))
app.use(logger)
app.use(express.static(staticPath))

//request handlers
app.get('/dogs', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(db.data.dogs)
})

export { app }