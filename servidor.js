const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: ' uploads/'});



const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

paises = [
  {
    id: "br",
    name: "Brasil",
  },
  {
    id: "usa",
    name: "Estados Unidos",
  },
  {
    id: "ir",
    name: "Irã",
  },
  {
    id: "ca",
    name: "Canadá",
  },
  {
    id: "bo",
    name: "Bolivia",
  },
  {
    id: "ar",
    name: "Argentina",
  },
  {
    id: "at",
    name: "Áustria",
  },
  {
    id: "be",
    name: "Bélgica",
  },
  {
    id: "bg",
    name: "Bulgaria",
  },
  {
    id: "cm",
    name: "Camarões",
  }
];

app.post("/cadastrarPais", upload.single("image"),(req, res) => {
  console.log(req);
  res.send(req.file)
})
app.get("/paises", (req, res) => {
    const { name } = req.query;
  
    if (name) {
      const filteredpaises = paises.filter((paises) => paises.name.includes(name));
  
      return res.json(filteredpaises);
    }
  
    res.json(paises);
  });
  app.get("/paises/:id", (req, res) => {
    const id = (req.params.id);
  yarn 
    const pais = paises.find((pais) => pais.id === id);
  
    if (pais) {
      return res.json(pais);
    } else {
      return res.status(400).json({ error: "pais not found." });
    }
  });

app.post("/paises", (req, res) => {
  const { name } = req.body;
  const { id } = (req.body);

  const pais = { id, name };

  paises.push(pais);

  res.status(201).json(pais);
});

app.put("/paises/:id", (req, res) => {
  const id = (req.params.id);
  const { name } = req.body;

  const index = paises.findIndex((pais) => pais.id === id);

  if (index >= 0) {
    const pais = { id, name };

    paises[index] = pais;

    res.json(pais);
  } else {
    return res.status(400).json({ error: "Pais not found." });
  }
});

app.delete("/paises/:id", (req, res) => {
  const id = (req.params.id);

  const index = paises.findIndex((pais) => pais.id === id);

  if (index >= 0) {
    paises.splice(index, 1);

    res.status(204).send();
  } else {
    return res.status(400).json({ error: "Pais not found." });
  }
});

app.get("/cadastra", function(req, res){
  return res.render('index.html');
});

app.post("/cadastrarPais", function(req, res){
  paises.push({id: req.body.id, name: req.body.nome});
  console.log(paises);
  return res.redirect('/');
});

app.get("/", function(req, res){
  return res.render("listaPaises.html", {paises: paises});
});

app.get("/editarPaises", function(req, res){
  var id = req.query.id;
  var nome = req.query.nome;


  return res.render("editarPaises.html", {nome: nome, id: id});
});

app.get("/alterarPais", function(req, res){
  var id = req.query.id;
  var nome = req.query.nome;

  for(var p in paises){
    if(paises[p].id === id){
      paises[p].id = id;
      paises[p].name = nome;
    }
  }
  return res.redirect('/');
});

app.get("/deletarPaises", function(req, res){
  var id = req.query.id;
  console.log(req.query.id);
  var aux = [];
  for(var p in paises){
    if(paises[p].id !== id){
      aux.push(paises[p]); 
    } 
  }
 
  paises = aux;
  return res.redirect('/');
});

app.listen(3000, () => { console.log(`Servidor rodando local na porta 3000`);});
