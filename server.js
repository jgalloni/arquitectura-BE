'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();


//variable
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

//list materias
app.get('/materias/', function (req, res) {
	var result=materias.filter(
		function(m){
			return inscripcion.filter(
				function(i){return i.codigo===m.codigo}
			).length==0;
		}
	);
  	res.json(result);
});

//list materias por codigo
app.get('/materias/:codigo', function (req, res) {
	var codigo=req.params.codigo;
	var result=materias.filter(function(m){if(inscripcion.indexOf(m) !== -1) return true}).filter(function(m){return m.codigo===codigo});
	console.log(result);
  	res.json(result);
});

//lista las inscripciones
app.get('/inscrip/',function(req,res){
	res.json(inscripcion);
});
//get inscripcion por id
app.get('/inscrip/:id',function(req,res){
	var id=req.params.id;
	var result= inscripcion.filter(function(m){return m.id===id});
	res.json(inscripcion);
});

//incribirse a un curso
app.post('/inscrip/',function(req,res){
	var curso = req.params.inscripcion;
	if(inscripcion.filter(function(i){i.materia===curso.materia}).length==0){
		inscripcion.add(curso);
  		res.send(true);
  	}else{
  		res.send(false)
  	}
});

//desincribirse a un curso
app.delete();

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);