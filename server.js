const fs = require('fs/promises')
const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path')

const pathToFile = path.join(__dirname,"db.json")
let cache = {}

async function readData(){
    try{
        let data = await fs.readFile(pathToFile, 'utf8')
        return JSON.parse(data)
    }catch(err){
        console.log(err)
    }
}

async function delayReadData(){
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 1500)
    })
    return await readData()
}


app.get('/products', async(req, res) => {
    try{
        let key = req.url
        let value = cache[key]
        if(value){
            return res.json(value)
        }
        let products = await delayReadData()
        cache[key] = products
        return res.json(products)
    }catch(err){
        console.log(err)
    }
});

app.get('/products/:id', async(req, res) => {
    try{
        let key = req.url
        let value = cache[key]
        if(value){
            return res.json(value)
        }
        let products = await delayReadData()
        let id =  Number(readData.params.id)
        let product = products.find((item) => item.id === id)
        cache[key] = product
        return res.json(product)
    }catch(err){
        console.log(err)
    }
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});