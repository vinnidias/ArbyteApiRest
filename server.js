const express = require('express')
const app = express();
const routes = require('./src/routes')
const port = process.env.PORT || 5000;
const morgan = require('morgan')
const bodyParser = require('body-parser')


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({})
    }
    next();
})

app.use(routes)
app.use((req, res, next)=>{
    const err = new Error('Erro ao realizar consulta');
    err.status = 404
    next(err)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

app.listen(port || 5000, err=>{
    if(err) return console.log('deu erro ao iniciar a porta', err)
    console.log('Rodou na porta', port)
})