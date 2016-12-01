'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const services = require('./services');

// Constants
const PORT = 8080;

// App
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//variable
/*
var materias = [
	    {codigo:'75.01',nombre:'Algoritmos y programacion I', 
	            cursos:[{docente:'carolo',horarios:[{dia:'lunes',desde:10,hasta:17}],cupos:[10,10]}],
	            correlativas:['cbc']
	    },
	    {codigo:'75.02',nombre:'Algoritmos y programacion II', 
	            cursos:[{docente:'calvo',horarios:[{dia:'lunes',desde:10,hasta:17}],cupos:[0,10]}],
	            correlativas:['75.01']
	    }
	];

var inscripcion =[];
*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","DELETE, GET, HEAD, POST, PUT, OPTIONS, TRACE");
  next();
});

//list materias
app.get('/materias/',services.obtenerMaterias);

app.get('/materias/:codigoMateria',services.buscarMateriaPorID);

//lista las inscripciones
app.get('/inscrip/',services.obtenerInscripciones);

//get inscripcion por id
app.get('/inscrip/:id',services.buscarInscripcionPorID);

//incribirse a un curso
app.post('/inscrip/',services.inscribirse);

//desincribirse a un curso
app.delete('/inscrip/:id',services.desinscribirse);

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);