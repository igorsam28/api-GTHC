//Estou muito feliz de estar participando do processo seletivo da GTHC
//Eu ainda sou iniciante, mas estou animado com a oportunidade de aprender mais e contribuir com a comunidade

const express = require ('express'); //importando o framework express

const app = express();//inicializando o framework express

const port = 3000; //definindo a porta do servidor

const BD = require("./bd.json"); //Esta parte seria a conexão com o banco de dados, porem estou simulando um bd com o arquivo "bd.json"

app.use(express.json()); //estou definindo que a aplicação utilizara JSON


app.get ("/api/users", function(req, res){ //quando a aplicação receber uma requisição get
    res.json(BD);// resposta no formato json de todos os usuarios cadastrados no banco de dados
    
});

app.get ("/api/users/:id", function(req, res) {
    const {id}  = req.params; // define os parametros para acessar um item especifico no banco de dados
    const user = BD.find(user => user.id === Number(id)); // serve para encontrar um usuários com um id especifico

    if (!user) return res.status(404).json("Usuário não encontrado."); // retornar codigo de resposta 404 e a frase usuario não encontrado

    res.status(200).json(user); //esta linga de código serve para retornar o usuario escolhido

});

app.post("/api/users", function(req, res){ // o método post serve para cadastrar um novo usuario

    const { name, email} = req.body; // esta linha serve para requisitar as informações nome e email do usuario a ser cadastrado e armazenar no BD

    if (!name || !email) {
        return res.status(400).json("Dados inválidos");  //Este comando é para retornar quando os dados inseridos forem inválidos
    }
    res.status(201).json("Usuário criado com sucesso." ); //retornar que o usuario foi cadastrado com sucesso
});

app.put("/api/users/:id", function(req, res){ // o método put tem como objetivo atualizar os dados cadastrados de um usuário existente

    const { id } = req.params;
    const user = BD.find(user => user.id === Number(id)) 
    if (!user) return res.status(404).json("Usuário não encontrado."); // se o usuário não for encontrado, então retornará o erro 404 com a mensagem de usuário 

    const { name, email} = req.body; // este codigo serve para atualizar os dados do usuario
    user.name = name; //Altera o nome do usuário
    user.email = email; // Altera o email do usuário

    if (!name || !email) {
        return res.status(400).json("Dados inválidos"); //tratamento de erro
    }

    res.status(200).json(user);
}); 

app.delete("/api/users/:id", function(req, res){ //O metodo delete serve para excluir um usuario cadastrado
    const id  = Number(req.params.id);

    BD.deleteOne({ _id: id }, (err) => { //Eu não consegui fazer um metodo delete que funcionasse sem usar o banco de dados, então utilizei o codigo para deletar um usuario no mongodb
        if (err) return res.status(500).json("Erro ao deletar usuário");
        res.status(200).json("Usuário deletado com sucesso");
    });

});


app.listen(3000, function(){ //Este código é para retornar uma mensagem quando o servidor estiver funcionando
    console.log("O servidor está funcionando")
})