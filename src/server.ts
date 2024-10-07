import fastify from 'fastify';
import { FastifyRequest, FastifyReply } from 'fastify';
import { request } from 'http';
import { number, z } from 'zod'

const app = fastify()

const spent = [
    { id: '1', expense_name: 'Pizza', expense_value: 70.00, month_of_expense: 'Jan', year_of_expense: '2022' },
    { id: '2', expense_name: 'Tenis', expense_value: 200.00, month_of_expense: 'Feb', year_of_expense: '2022' },
    { id: '3', expense_name: 'Notebook', expense_value: 3500.00, month_of_expense: 'Jan', year_of_expense: '2022' },
    { id: '4', expense_name: 'Smartphone', expense_value: 1800.00, month_of_expense: 'Oct', year_of_expense: '2021' },
]


//listar todos
app.get('/spending', (request: FastifyRequest, reply: FastifyReply) => {
    //a resposta é um status code 200, que é positivo e retorna o array. Futuramente o retorno será do BD
    return reply.status(200).send(spent)
})


// Localizar pelo id
app.get('/spending/:id', (request: FastifyRequest, reply: FastifyReply) => {
    const paramSchema = z.object({
        id: z.string()
    })

    const { id } = paramSchema.parse(request.params) 

    const spentId = spent.filter(spent => spent.id === id)

    if (spentId.length === 0) {
        return reply.status(404).send('Id inexistente')
    }

    return reply.status(200).send(spentId)
})

// Inserir gasto
app.post('/spending', (request: FastifyRequest, reply: FastifyReply) => {
    const bodySchema = z.object({
        expense_name: z.string(),
        expense_value: number(),
        month_of_expense: z.string(),
        year_of_expense: z.string()
    })
    const {expense_name, expense_value, month_of_expense, year_of_expense } = bodySchema.parse(request.body)

    // Verificar gastos iguais
    for (const expense of spent) {
        if (
            expense.expense_name === expense_name &&
            expense.month_of_expense === month_of_expense &&
            expense.year_of_expense === year_of_expense
        ) {
            // Se já existe, retornamos uma mensagem de erro
            return reply.status(400).send({ message: "Gasto repetido" });
        }
    }

    const spentNew = {
        id: String(spent.length + 1),
        expense_name,
        expense_value,
        month_of_expense,
        year_of_expense
    }
    spent.push(spentNew)
    return reply.status(200).send(spentNew)
})

// Soma total
app.get('/spending/total', (request: FastifyRequest, reply: FastifyReply) => {
    let total = 0

    for (const expense of spent) {
        total += expense.expense_value;
    }

    return reply.status(200).send({ total });
})


//Iniciar na porta 3333 / iniciar o servidor.
app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP server runing on http://localhost:3333')
})

