
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());

const puerto = process.env.PUERTOS || 3000;
const servidor = process.env.HOSTORG || 'localhost';

app.listen(puerto, () => console.log(`Servidor Disponible http://${servidor}:${puerto}`));

const { nuevoCurso, getCurso, editCurso, deleteCurso } = require("./consultas");

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/curso', async (req, res) => {
    const data = Object.values(req.body)
   
    const respuesta = await nuevoCurso(data[0], data[1], data[2], data[3]);
   
    res.send(respuesta);
});
app.get("/cursos", async (req, res) => {

    const respuesta = await getCurso();
    res.send(respuesta);

});
app.put("/curso", async (req, res) => {
  
     const  { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body;


   const respuesta = await editCurso(id,nombre, nivelTecnico, fechaInicio, duracion);
    
    res.send(respuesta);
});
app.delete("/curso/:id", async (req, res) => {
    
    
   const { id } = req.params;
   

   const { nombre} = req.body;

    const respuesta = await deleteCurso(id);
    console.log(respuesta)
    respuesta > 0
        ? res.send(`El curso de nombre ${nombre} fue eliminado con éxito`)
        : res.send("No existe un curso registrado con ese nombre");
});