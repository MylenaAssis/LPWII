//importando servidor web
import fastify from 'fastify';
//
import { FastifyRequest, FastifyReply } from 'fastify';
//executando fastify na const app. O app tem as funcionalidades do fastify
const app = fastify()

//Entre [] é criado o array e entre {} objeto
const users = [
    { id: '1', name: 'Joao', email: 'joao@unifoa.edu.br', phone: '24999000500' },
    { id: '2', name: 'Pedro', email: 'pedro@unifoa.edu.br', phone: '24999000501' },
    { id: '3', name: 'Maria', email: 'maria@unifoa.edu.br', phone: '24999000502' },
    { id: '4', name: 'Rosa', email: 'rosa@unifoa.edu.br', phone: '24999000503' },
]

//criando a primeira rota com o metodo get, com o objetivo de listar todos os usuarios
//rota users, com os parametros: request do tipo fastifyrequest e reply do tipo fastifyreply
//app é o nosso servidor web
app.get('/users', (request: FastifyRequest, reply: FastifyReply) => {
    //a resposta é um status code 200, que é positivo e retorna o array. Futuramente o retorno será do BD
    return reply.status(200).send(users)
})

//subir o app. Iniciar na porta 3333, iniciar o servidor.
app.listen({
    port: 3333,
    //quando subir o servidor web com sucesso imprimir a mensagem a seguir:
}).then(() => {
    console.log('HTTP server runing on http://localhost:3333')
})

