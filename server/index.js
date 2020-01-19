const express = require('express')
const app = express()
const PORT = process.env.PORT || 3006
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//connectMongodb
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

//This error occurs when the client URL and server URL don't match, including the port number.
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

//Schema for mogodb
const productSchema = require('./models/crmModel')
const productModel = mongoose.model('product',productSchema)

//Add New product
app.post('/newproduct',(req,res)=>{
    let product = new productModel(req.body)
    product.save((err, productModel)=>{
        if(err){
            ressend(err)
        }
        res.json(product)
    })
})

let getAllProducts =(req, res)=>{
    productModel.find({},(err, products)=>{
        if(err){
            res.send(err)
        }
        res.json({"items": products})
    })
}
//Pull All Data in mongodb 
app.get('/getproduct',getAllProducts)

let getProductID =(req, res)=>{
    productModel.findById((req.params.productId),(err, product)=>{
        if(err){
            res.send(err)
        }
        res.json(product)
    })
}
app.get('/product/:productId',getProductID)

// let updateProduct = (req, res)=>{
//     productModel.findOneAndUpdate({_id:req.params.productId},req.body, {new:true},(err, updateProduct)=>{
//         if(err){
//             res.send(err)
//         }
//         res.json(updateProduct)
//     })
// }
// app.put('/product/:productId',updateProduct)
// let deleteProduct = (req, res)=>{
//     productModel.remove({_id:req.params.productId},(err,product)=>{
//         if(err){
//             res.send(err)
//         }
//         res.json({message: 'Deleted Success'})
//     })
// }
// app.delete('/product/:productId',deleteProduct)
app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(`Application on port ${PORT}`)
})