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
    //listar o documento para o excluir
    app.get('/mygrid_excluir',async(req,res)=>{
        //recuperar a id da barra de endereço
        var id = req.query.id
        //procurar o documento especifico
        var procurar = await modelo.findOne({_id:id})
        console.log(procurar)
        //abrir a view mygrid_excluir e enviar a json do documento
        res.render('mygrid_excluir.ejs',{dados:procurar})

    })
    //excluir documento da coleção atual
    app.get('/excluir_mygrid',async(req,res)=>{
        //recuperand o id da barra de endereços
        var id = req.query.id
        //excluindo o documento da coleção
        var excluir = await modelo.findOneAndRemove({_id:id})
        //voltar para a página mygrid
        res.redirect('/mygrid')

    })
}