const fs = require('fs/promises')
const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path')
const pathToFile = path.join(__dirname,"db.json")


async function readData(){
    try{
        let data = await fs.readFile(pathToFile, 'utf8')
        return JSON.parse(data)
    }catch(err){
        console.log(err)
    }
}


app.get('/products', async(req, res) => {
    try{
        let products = await readData()
        res.json(products)
        res.send('Hello World!');
    }catch(err){
        console.log(err)
    }
});

app.get('/products/;id', async(req, res) => {
    try{
        let id =  Number(readData.params.id)
        let products = await readData()
        let data = products.find((item) => item.id === id)
        res.json(data)
    }catch(err){
        console.log(err)
    }
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});