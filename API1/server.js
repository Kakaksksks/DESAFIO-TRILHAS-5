import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors';


const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.post('/usuarios', async (req, res) => {

   const user = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
    })

    res.status(201).json(user)
})

app.get('/usuarios', async (req, res) => {
    let users = []
    
        users = await prisma.user.findMany()
        console.log(users)
        
    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
             email: req.body.email,
             name: req.body.name,
             password: req.body.password
         }
     })

     res.status(201).json(req.body)
 })

app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'Usuário deletado com sucesso!' })

})


app.use(express.static('public'))
app.listen(3000)


/* 

usuario: maxs0298
senha: AE3SBDow9abJl6eo
*/

