
//Este index es el programa principal que se ejecuta para colocar en funcionamiento el backend,
//este maneja las solicitudes get y post que recebida el puerto 3001
//Es necesario importat el módulo models.js para la comunicación con l abase de datos

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const models = require('./models')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.post('/', function (req, res) {
    var data = JSON.parse(JSON.stringify(req.body))
    res.status(200).send({ message: 'ok' })
    console.log(data)
    models.push_data(data).then(
        result => {
            console.log(result)
        }, e => console.log(e)
    )
})

app.get('/',function (req, res){
    res.setHeader('Access-Control-Allow-Origin', '*')

    models.show_data().then(
       result => {
        res.status(200).send(result)
        console.log("ok")
       }, e => console.log(e)
    )
})


app.listen(3001)

