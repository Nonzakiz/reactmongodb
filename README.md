# Instructions for use
- cd client and Npm start
- cd server and Npm start

## React
- Axios Post to Api
- react-router
- react

## Nodejs
- mongoose Connect mongoDB
- body-parser parse application/json
- express use routing
- cors is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

# I don't know why the Cilent folder cannot be opened.

![GitHub Logo](https://s5.gifyu.com/images/Screen-Recording-2563-01-20-at-08.55.39.gif)

## Pull data

```
import React, { Component } from 'react';

  export default class MyComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        product: []
      };
    }


    componentDidMount() {
      fetch("http://localhost:3006/getproduct")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              product: result.items
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, product } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <ul>
            {product.map(item => (
              <li key={item.title}>
               <h2>{item.title}</h2>{item.detail}<br/> Price : {item.price} Bath
              </li>
            ))}
          </ul>
        );
      }
    }
 }
```
##  Add data
```
import React, { Component } from 'react';
import axios from 'axios';
export default class PostData extends Component {
    constructor (props) {
      super(props)
      this.state = {
        title: '',
        detail: '',
        price:''
      }
    
      this.onChangeProductTitle = this.onChangeProductTitle.bind(this);
      this.onChangeProductDetail = this.onChangeProductDetail.bind(this);
      this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
      this.onSubmitButton = this.onSubmitButton.bind(this);
    }
    // Clear value
    onChangeProductTitle(e) {
        this.setState({ title: e.target.value })
    }
    onChangeProductDetail(e) {
        this.setState({ detail: e.target.value })
    }
    onChangeProductPrice(e) {
        this.setState({ price: e.target.value })
    }
      onSubmitButton(e) {
          e.preventDefault();
          axios.post('http://localhost:3006/newproduct', {
            title: this.state.title,
              detail: this.state.detail,
              price: this.state.price
          })
          .then(function (response) {
              console.log(response.data);
          })
          .catch(function (error) {
              console.log(error);
          });
          
          this.setState({
            title: '',
              detail: '',
              price:''
          })
      }
     
    componentDidMount () {
    }
     
    render () {
      return (
          <div className="container">
              <div className="row justify-content-center">
                  <div className="col-md-8">
                      <div className="card">
                          <div className="card-header">Add Product</div>
     
                          <div className="card-body">
                              <form onSubmit={this.onSubmitButton}>
                                  <strong>Name:</strong>
                                  <input type="text" name="title" className="form-control" value={this.state.title} onChange={this.onChangeProductTitle} />
                                  <strong>Detail:</strong>
                                  <textarea className="form-control" name="detail" value={this.state.detail} onChange={this.onChangeProductDetail}></textarea>
                                  <strong>Price:</strong>
                                  <input type="number" name="price" className="form-control" value={this.state.price} onChange={this.onChangeProductPrice} />
                                
                                  <button className="btn btn-success">Submit</button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          
      )
    }
  }
```
##  app.js
```
import React from 'react';
import MyComponent from './component/MyComponent'
import PostData from './postData/PostData'
//const axios = require('axios');   
function App() {
  return (<div>
    <MyComponent/>
    <PostData /></div>
  );
}

export default App;
```
##  Back-end by nodejs
```
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3006
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//connectMongodb and create Table test
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

//This error occurs when the client URL and server URL don't match, including the port number.
const cors = require('cors')

app.use(cors())
//parse application/json
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

let updateProduct = (req, res)=>{
    productModel.findOneAndUpdate({_id:req.params.productId},req.body, {new:true},(err, updateProduct)=>{
        if(err){
            res.send(err)
        }
        res.json(updateProduct)
    })
}
app.put('/product/:productId',updateProduct)
let deleteProduct = (req, res)=>{
    productModel.remove({_id:req.params.productId},(err,product)=>{
        if(err){
            res.send(err)
        }
        res.json({message: 'Deleted Success'})
    })
}
app.delete('/product/:productId',deleteProduct)
app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(`Application on port ${PORT}`)
})
```
# Schema mongoose
```
const mongoose = require('mongoose')
const schema = mongoose.Schema

var productSchema = new schema({
    title: String,
    detail: String,
    price: Number

})

module.exports = productSchema
```
