import cors from "cors"
import express, { Request, Response } from "express"
/* import { UserDataBase } from "./database/UserDatabase"
import { User } from "./models/User" */
import { db } from "./database/BaseDataBase"

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

// SIGNUP
app.post("/users/signup", async (req: Request, res: Response)=>{
    try {

        const id = req.body.id
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        if(!name){
            res.status(400)
            throw new Error("Por favor, insira as informações para cadastro do produto.");
        }

        const newUser = {
            id: id,
            name:name,
            email:email,
            password:password
        }

        await db.insert(newUser).into("users")

        res.status(201).send({ message: "Cadastro realizado com sucesso" })
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// LOGIN
app.post("/users/login", async (req: Request, res: Response)=>{
    try {
        const email = req.body.email
        const password = req.body.password

        if(!email){
            res.status(400)
            throw new Error("Por favor, insira o e-mail para realizar o login.");
        }

        if(!password){
            res.status(400)
            throw new Error("Por favor, insira sua senha para realizar o login.");
        }

        const newLogin = {
            email:email,
            password:password
        }

        await db.insert(newLogin).into("users")

        res.status(200).send({ message: "Login realizado com sucesso" })
    } catch (error) {
        
    }
})

// GET POSTS - OLHAR O RESULT
app.get("/posts", async (req: Request, res: Response)=>{
    try {
        const result = await db("posts")

        const userCreator = await db("users")
        .select(
            "users.id",
            "users.name",
            "posts.id",
            "posts.creator_id",
            "posts.content"
        ).innerJoin(
            "posts",
            "users.id",
            "=",
            "posts.creator_id"
        )

        if(result.length<1){
          res.status(400)
          throw new Error("Não existem posts cadastrados.");
        }

        /* const mapResult = result.map((post) => {
            post.creator = "ts"
        }) */

      res.status(200).send(userCreator)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
        
    }
})

// CREATE POST
app.post("/posts", async (req: Request, res: Response)=>{
    try {

        const content = req.body.content

        if(!content){
            res.status(400)
            throw new Error("Por favor, insira um conteúdo para criar o post.");
        }

        const newPost = {
            content: content
        }

        await db.insert(newPost).into("posts")

        res.status(201).send({ message: "Post cadastrado com sucesso" })
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// EDIT POST
app.put("/posts/:id", async (req: Request, res: Response) =>{
    try {
        const idToEdit = req.params.id

        const newContent = req.body.content
       /*  const newUpdatedAt = datetime("now", "localtime") */

        if (newContent !== undefined) {

            if (typeof newContent !== "string") {
                res.status(400)
                throw new Error("O conteúdo deve ser string.")
            }

            if (newContent.length < 1) {
                res.status(400)
                throw new Error("O conteúdo não pode estar vazio.")
            }
        
            const [ post ] = await db.select("*").from("posts").where({id:idToEdit})

            if (post) {
                await db.update({content: newContent}).from("posts").where({id:idToEdit})
                /* await db.update({updated_at: newUpdatedAt}).from("posts").where({id:idToEdit}) */
            } else {
                res.status(404)
                throw new Error("'id' não encontrada")
            }
    
            res.status(200).send({ message: "Post atualizado com sucesso" })
        }
    } catch (error) {
        
    }
})

// DELETE POST
app.delete("/posts/:id", async (req: Request, res: Response)=>{

    try {
        const idToDelete = req.params.id

        const [post] = await db("posts").where({id:idToDelete})

    if(!post) {
        res.status(404)
        throw new Error("Id não encontrado")
    } else {
        await db.delete().from("posts").where({id:idToDelete})

        res.status(200).send({
            message: "Post excluído com sucesso"
        })
    } 
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})

// LIKE/DISLIKE POST
app.put("/posts/:id/like", async (req: Request, res: Response) =>{
    try {

        const idToLike = req.params.id
        const newLike = req.body.like

        if (newLike != true || newLike != false) {

            res.status(400)
            throw new Error("Insira um valor que seja false para dislike ou true para like.")
        }
        
            const [ post ] = await db.select("*").from("likes_dislikes").where({post_id:idToLike})

            if (post) {

                await db.update({like: newLike}).from("likes_dislikes").where({post_id:idToLike})

            } else {
                res.status(404)
                throw new Error("Post não encontrado")
            }
            
            if(newLike === true) {
                res.status(200).send({message: "Post curtido com sucesso"})
            } else {
                res.status(200).send({message: "Post descurtido com sucesso"})
            }
    
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
