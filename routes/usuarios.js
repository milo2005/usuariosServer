var express = require('express');
var router = express.Router();

//Obtener usuarios
//path /usuarios
router.get("/",function(req,res,next){
  req.db.query("SELECT * FROM usuario", function(err, results, fields){
    if(err){
      res.send([]);
    }else{
      res.send(results);
    }
  });
});

//Obtener usuario
//path /usuarios/:id
router.get("/:id", function(req,res,next){
  var id = req.params.id;
  req.db.query("SELECT * FROM usuario WHERE id = "+id, function(err, results, fields){
    if(err || results.length == 0){
      res.status(404).send({msg:"Usuario no encontrado"});
    }else{
      res.send(results[0]);
    }
  });
});

//Insertar usuario
//path /usuarios
router.post("/", function(req, res, next){
  var body = req.body;
  req.db.query("INSERT INTO usuario SET nombre = ?, correo = ?, usuario = ?, password = ?"
  , [body.nombre, body.correo, body.usuario, body.password], function(err, results){
    if(err){
      res.send({success:false});
    }else{
      res.send({success:true});
    }
  });
});

//Actualizar usuario
//path /usuarios/:id
router.put("/:id", function(req,res,next){
  var id = req.params.id;
  var body = req.body;
  req.db.query("UPDATE usuario SET nombre = ?, correo = ?, usuario = ?, password = ? WHERE id = ?"
  ,[body.nombre, body.correo, body.usuario, body.password, id], function(err, result){

    if(err){
      res.send({success:false});
    }else{
      res.send({success:true});
    }


  });
});

//Eliminar usuario
//path /usuarios/:id
router.delete("/:id", function(req, res, next){
  var id = req.params.id;
  req.db.query("DELETE FROM usuario WHERE id = "+id,function(err, results){
    if(err){
      res.send({success:false});
    }else{
      res.send({success:true});
    }
  });
});

//Iniciar Sesion
//path /usuarios/login

router.post("/login",function(req,res,next){
  var body = req.body;
  req.db.query("SELECT * FROM usuario WHERE usuario = ? AND password = ?"
,[body.usuario, body.password], function(err,result){

  if(err || result.length==0){
      res.send({success:false});
  }else{
    res.send({success:true, usuario:result[0]});
  }

});


});

module.exports = router;
