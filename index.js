const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.pathname || 5000;
const cors = require('cors');

//middlewire

app.use(cors());
app.use(express.json());

// username: user1
//password: zGpwJevVGtLing6D





const uri = "mongodb+srv://user1:zGpwJevVGtLing6D@cluster0.obt1m2j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function  run (){
    try {
        const userCollection = client.db('database1').collection('users');



        app.get('/users', async (req,res)=>{
            const query ={};
            const cursor =  userCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/users',async(req,res)=>{

            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(user);
            res.send(result);
        });
        app.delete('/users/:id', async (req,res) =>{

            const id = req.params.id;
            const query ={ _id: new ObjectId(id) };

            const result = await userCollection.deleteOne(query);

            res.send(result);

        })

        app.get('/users/:id', async (req,res) =>{
            const id = req.params.id;
            const query = {_id : new ObjectId(id)};

            const user = await userCollection.findOne(query);

            res.send(user);
        })

        app.put('/users/:id', async (req,res) =>{
            const id = req.params.id;
            const filter = {_id: new ObjectId(id)};
            const user = req.body;
            console.log(user);
            const option = {upsert:true};

            const updateUser = {
                $set: {
                    name: user.name,
                    email: user.email,
                    address: user.address
                }
            }

            const result = await userCollection.updateOne(filter, updateUser, option);
            res.send(result);

        })
    }
    finally{

    }
}
run().catch(err=>console.log(err))


app.get('/',(req,res)=>{
    res.send('Server run successfull')    
})

app.listen(port,()=>{
    console.log('Server running on port', port);
})
