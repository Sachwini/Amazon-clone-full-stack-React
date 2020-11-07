const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const { request, response } = require('express');
const stripe = require("stripe")('sk_test_51HkVvzIg2wuQXm8tzhol21CW2WhCVacyqN1h7YoGCzrwjAHJtrVxrYg7A1vpmI9wwa9fT5jew0tagf2XNx7t43Nw00zJzco7Xe')

//App config
const app = express();

//Midlewares
app.use(cors({origin:true}));
// cors is like some kind of security.
app.use(express.json());
//send or pass data in json format

//API routes... this will give us some kind of request and response and checks if it work by sendind status 200
app.get('/',(request,response)=>response.status(200).send('hello world'));

app.post('/payments/create',async (request,response)=>{
    const total = request.query.total;
    console.log("Payment request recieved for this amount>>>",total)

const paymentIntent = await stripe.paymentIntents.create({
    amount:total,//subunits of the currency
    currency:"usd",
})

//ok created
response.status(201).send({
    clientSecret:paymentIntent.client_secret,
})
})

//listen command.. here the functions means the cloud function
exports.api = functions.https.onRequest(app)
