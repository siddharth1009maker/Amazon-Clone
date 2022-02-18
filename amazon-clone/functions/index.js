/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51KNb37SDyanzXER2coqIHZFalocL6F85La3RaCNIhyNJlZlvnrZ26xri0Hgn1BcSIr2h0iA7dCZ6XNXFtbOx6blW00rT5HHpAw");

const app = express();

app.use(cors({origin : true}));
app.use(express.json());
app.get('/' , (req , res) => res.status(200).send("Hello World"));
app.post('/payments/create' , async (req , res) => {
    const total = req.query.total;
    console.log('Payment request received ' , total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount : total , //subunit of the curency
        currency : "inr",
    });
    // It is OK but it has also created something
    res.status(201).send({
        clientSecret : paymentIntent.client_secret,
    })
})
exports.api = functions.https.onRequest(app);