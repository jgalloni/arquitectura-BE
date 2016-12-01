const MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
const urlDB = 'mongodb://mongo/fiuba';

//generador de id
const uuid = require('node-uuid');

module.exports = {


	obtenerMaterias: function(req,res){

		MongoClient.connect(urlDB,(err,db)=>{
			if(err){
				console.log(err);
				Promise.reject(err);
			}
			db.collection('inscripcion').find({}).toArray((err,insc)=>{
				db.collection('materias').find({}).toArray((err,materias)=>{
					var materiasInscriptas = insc.map((i=>i.materia));
					var ret = materias.filter(m=>{
						return materiasInscriptas.indexOf(m.codigo)===-1})
					;
					res.json(ret).end();
				});
			});
			
		});

	},

	buscarMateriaPorID : function(req,res){
		MongoClient.connect(urlDB,(err,db)=>{
			if(err){
				Promise.reject(err);
			}
			db.collection('materias').findOne({codigo:req.params.codigoMateria},(err,materia)=>{
				res.json(materia).end();
			});
		});
	},

	obtenerInscripciones: function(req,res){
		MongoClient.connect(urlDB,(err,db)=>{
			if(err){
				Promise.reject(err);
			}
			db.collection('inscripcion').find({}).toArray((err,insc)=>{
				res.json(insc).end();
			});
		});
	},

	buscarInscripcionPorID: function(req,res){
		MongoClient.connect(urlDB,(err,db)=>{
			if(err){
				Promise.reject(err);
			}
			db.collection('inscripcion').findOne({codigo:req.params.codigoMateria},(err,materia)=>{
				res.json(materia).end();
			});
		});
	},

	inscribirse: function(req,res){
		MongoClient.connect(urlDB,(err,db)=>{
			if(err){
				Promise.reject(err);
			}
			var curso = req.body.inscripcion;
			db.collection('materias').find({codigo:req.params.codigoMateria}).toArray((err,materias)=>{
				if(materias.length==0){
					db.collection('inscripcion').insertOne(req.body.inscripcion,(err,materias)=>{console.log(err)});
					res.send(true);
				}else{
					res.send(false);
				}
			});
		});
	},

	desinscribirse: function(req,res){
		MongoClient.connect(urlDB,(err,db)=>{
			if(err){
				Promise.reject(err);
			}
			var curso = req.params.id;
			console.log(curso);
			db.collection('inscripcion').deleteOne({_id: new mongodb.ObjectId(curso)},(err,msj)=>{
				console.log(err);
				console.log(msj);
			})
			res.send(true);
		});
	}
}




/*Inscripcion.find({},(insc)=>{
		console.log(insc);
		Materia.find({},(materia)=>{
			console.log(materia);
			let result =materia.filter(
				(m)=>{
						let ret= insc.filter((i)=>{
							return i.materia===m.codigo
						}).length==0;
						return ret;
					});
			res.json(result);
		});
  	});*/