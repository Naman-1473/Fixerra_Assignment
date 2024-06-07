import express from 'express'
import cors from 'cors'
import connectDB from './db/index.js'
import dotenv from 'dotenv'

dotenv.config()

const app=express()

connectDB()

app.use(cors(
    {
        methods: 'GET,POST,PATCH',
    }
))
app.use( express.json() )
app.use( express.urlencoded( {extended: true} ) )
app.use( express.static( "public" ) )

import houseRouter from './routes/house.routes.js'

app.use("/api/v1",houseRouter)


const port = process.env.PORT || 6000

app.listen( port, () =>
{
    console.log( `Server running on port ${ port }` );
} )

