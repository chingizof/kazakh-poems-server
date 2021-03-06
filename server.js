import express from "express"
import cors from 'cors'
import bodyParser from "body-parser"
import { connect, getDB } from "./db/conn.js"

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connect()

app.get('/api/result',  (req, res) => {
    getDB().
    collection('nfactorial').
    find({}).
    sort("score").
    toArray((err, result) => {
        if (err) {
            console.error(err)
            res.status(500).json({err:err})
            return
        }
        res.status(200).json(result)
    })
})

app.post('/api/share', (req, res) => {
    const newItem = req.body
    getDB().
    collection("nfactorial").
    insertOne(newItem)

    res.status(200).send()
})

app.listen(process.env.PORT || 5001, () => {
    console.log('listening on 5001')
})