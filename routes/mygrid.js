module.exports = (app)=>{
    //importar as configurações do database
    var conexao = require('../config/database')
    //importar o modelo mygrid
    var modelo = require('../models/mygrid')

    //abrir o formulário mygrid.ejs
    app.get('/mygrid',(req,res)=>{
        //conectar com o database
        conexao()
        //buscar todos os documentos da colecao mygrid
        modelo.find()
        .then((modelo)=>{
            res.render('mygrid.ejs',{dados:modelo})
        })
        .catch(()=>{
            res.render('mygrid.ejs')
        })
    })

    //gravar as informações do formulário
    app.post('/mygrid',(req,res)=>{
        //conectar com o database
        conexao()
        //gravar o documento na coleção mygrid
        var documento = new modelo({
            titulo:req.body.titulo,
            texto:req.body.texto
        }).save()
        .then(()=>{
            res.redirect('/mygrid')
        })
        .catch(()=>{
            res.send('Não foi possível gravar os dados no DB')
        })
    })
}