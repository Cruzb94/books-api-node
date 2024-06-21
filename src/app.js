const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Cargar archivo de entorno
dotenv.config();

const app = express();

const port= process.env.PORT || 3000;

const routerApi = require('./routes');
//Middleware
app.use(cors());
app.use(express.json()); //permite recibir datos en formato json
app.use(express.urlencoded({ extended: true})); // permite recibir datos en formato urlencoded

app.get('/', (req,res) => {
    res.send("APP EN NODE JS");
});

routerApi(app);

app.listen(port,()=>{
    console.log('Port ==> ', port);
})