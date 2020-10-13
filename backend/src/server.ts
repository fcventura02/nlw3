import express from 'express';

import './database/connections'

const app = express();
app.use(express.json());
app.get('/', (req, res)=>{
    res.send("Ok")
    console.log('teste');
})


app.listen(3333);