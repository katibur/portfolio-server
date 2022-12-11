const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.aqlapfl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const projectsCollection = client.db('portfolio').collection('projects');

        // for categories
        app.get('/categories', async (req, res) => {
            const query = {}
            const categories = await projectsCollection.find(query).toArray();
            res.send(categories);
            console.log(categories);
        });

        app.get('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await projectsCollection.find(filter).toArray();
            res.send(result);
        });
    }
    finally {

    }
}
run().catch(console.log)

app.get('/', async (req, res) => {
    res.send('Portfolio is running');
})

app.listen(port, () => {
    console.log(`Portfolio running on port: ${port},${process.env.DB_PASSWORD}`)
})