const express = require('express');

const app = express()

const port = 3000;

const bodyParser = require ('body-parser');

//configuracao do ejs
app.set('view engine', 'ejs');

app.set('views',__dirname + '/views');

//configurar o body-parse para processar os dados do form

app.use(bodyParser.urlencoded({extended : true}));

//blog

const posts = [
    {
        id : 1,
        title: 'Primeira Postagem',
        content: 'Este e o conteudo da primeira postagem'

    },
    {
        id: 2,
        title: 'Segunda Postagem',
        content: 'Este e o conteudo da segunda postagem'
    }
];

//criacao das rotas

//rota principal

app.get('/',(req,res)=>{
    res.render('index', {posts});

});

//rota para exibir uma postagem individual

app.get('/post/:id',(req,res)=>{
    const id = req.params.id;
    const post = posts.find(post => post.id === parseInt(id));
    res.render('post',{post});

});

//post o formulario

app.get('/add',(req,res)=> {
    res.render('add');

});

//Rota para processar a adicao da postagem

app.post('/add',(req,res) => {
    const {title, content} = req.body;
    const id = posts.length + 1;
    posts.push({id,title,content});
    res.redirect('/');
});

app.listen(port,() =>{
    console.log(`servidor rodando em http://localhost:${port}`);
});