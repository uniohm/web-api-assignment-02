const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const app = express()

app.use(express.json())


const uri = 'mongodb://superadmin:14511451@cluster0-shard-00-00.2xwft.mongodb.net:27017,cluster0-shard-00-01.2xwft.mongodb.net:27017,cluster0-shard-00-02.2xwft.mongodb.net:27017/mbooks?ssl=true&replicaSet=atlas-50w25z-shard-0&authSource=admin&retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
let db,bookscollection

async function connect(){
    await client.connect()
    db = client.db('mbooks')
    bookscollection = db.collection('books')
}
connect()

app.get('/books', async (req, res) => {
    
    const cursor = await bookscollection.find({})
    const result = await cursor.toArray()

    res.status(200).json(result)
})


app.get('/books/:id', async (req, res) =>{
    
    let id = req.params.id
   
    
   
    const book = await bookscollection.findOne({ _id: ObjectId(id)})

    res.status(200).json(book)

})


app.post('/books', async (req, res) => { 

   
    let newtitle = req.body.title 
    let newprice = req.body.price 
    let newunit = req.body.unit 
    let newisbn = req.body.isbn 
    let newimageurl = req.body.imageurl 

    let newBook = {
        title: newtitle, 
        price: newprice,
        unit: newunit,
        isbn: newisbn,
        imageurl: newimageurl,
    }
    let bookID = 0


    const result = await bookscollection.insertOne(newBook)

    bookID = result.insertedId



    res.status(201).json(bookID)
})

const port = 3000
app.listen(port, () => console.log(`Server started again at ${port}`))

