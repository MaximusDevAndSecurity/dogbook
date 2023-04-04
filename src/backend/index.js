import { app } from './server.js'
const PORT = 1337

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT)
})