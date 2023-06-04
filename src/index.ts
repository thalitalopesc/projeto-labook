import cors from "cors"
import express, { Request, Response } from "express"
import { postRoute} from "./Router/PostRouter";
import dotenv from 'dotenv'
import { userRoute } from "./Router/UserRoute";

dotenv.config()

const app = express();

app.use(cors());

app.use(express.json());

app.listen(Number(process.env.PORT) || 3003,()=>{console.log(`Servidor rodando na porta ${3003}`);

})
app.use('/posts', postRoute)
app.use('/users', userRoute)