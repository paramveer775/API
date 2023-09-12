const express = require("express");
const cors = require("cors");
const app = express();

const port =  process.env.PORT || 3000;

app.use(cors());
const apidata = require("./data.json");



app.get("/" , (req, res) => {

res.send("thanos");

});


//   one data through id
app.get("/apidata/:id", (req, res) => {
    const onedata = apidata.find(apidata => apidata.id.toString() === req.params.id)

    if(onedata) {
        res.send(onedata);
    } else {
        res.status(404).send("Not Found");
    }
});

//  add new data
app.post("/apidata", (req,res) => {
    const newdata = req.body;
    apidata.push(newdata);

    res.status(201).send('New data Added');
})


// to delete an data
app.delete("/apidata/:id", (req, res) => {
    const deleteData = apidata.findIndex(apidata => apidata.id.toString() === req.params.id)

    if(deleteData > -1) {
        apidata.splice(apidata, 1)
        res.send("data Deleted");
    } else {
        res.status(404).send('Not found');
    }
})




// to show all 
app.get("/apidata", (req, res) => {
    console.log(apidata);
    res.send(apidata);
});


//  update the data
app.patch("/apidata/:id", (req, res) => {
    const id = req.params.id;
    const newDatadetails = req.body;

    const updateDataIndex = apidata.findIndex(data => data.id.toString() === id);

    if (updateDataIndex > -1) {
        const oldData = apidata[updateDataIndex];
        apidata[updateDataIndex] = {
            ...oldData,
            ...newDatadetails,
        };
        res.send('Data Updated');
    } else {
        res.status(404).send('Not found');
    }
});



app.listen(port, () => {
console.log("batman")

});













/*
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors())

app.get('/', (req, res) => {

    return res.json("from backend side");

})



const port =  process.env.PORT || 3000;
app.listen(3000, ()=>{
    console.log("listening");

})*/




/*

const { MongoClient } = require("mongodb");
const url = 'mongodb://localhost:27017/THANOS';

const client = new MongoClient(url);

async function getData() {
  try {
    await client.connect();
    const db = client.db('THANOS');
    const collection = db.collection('THOR');
    const response = await collection.find({}).toArray();
    console.log(response);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    
    client.close();
  }
}

getData();

*/