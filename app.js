require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 4000
const GetFile = require('./getFile')
const AddFile = require('./addFile')

// 
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// <-- Routes -->
app.post('/set-data', async (req, res) => {
    try {
        const data = req.body
        const cid = await AddFile(data)

        res.send({
            success: true,
            message: 'data successfuly saved',
            data: cid
        })
    }
    catch(err) {
        res.send({
            success: false,
            message: err.message,
            data: null
        })
    }
})

// <-------    --------
app.post('/get-data', async (req, res) => {
    try {
        const id = req.body.id
        const data = await GetFile(id)

        res.send({
            success: true,
            message: 'data successfuly retrieved',
            data
        })
    }
    catch(err) {
        res.send({
            success: false,
            message: err.message,
            data: null
        })
    }
})

// <-- init server -->
async function initServer () {
    try {
        app.listen(PORT, () => {
            console.log(`server started on PORT: ${PORT}`)
        })
    }
    catch(err) {
        console.log ({
            success: false,
            message: err.message,
            data: null
        })
        process.exit(1)
    }
}
initServer()