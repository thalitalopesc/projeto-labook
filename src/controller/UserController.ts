import { Request, Response } from "express";
import { BaseError } from "../Error/BaseError";
import { ZodError } from "zod";
import { GetUsersSchema } from "../dtos/UsersDTO/GetUsers.dto";
import { UserBusiness } from "../Business/UserBusiness";
import { SignupSchema } from "../dtos/UsersDTO/Signup.dto";
import { LoginSchema } from "../dtos/UsersDTO/Login.dto";

export class UserController {
    
    constructor(private userBusiness: UserBusiness) {}
  
    public getUsers = async (req: Request, res: Response) => {
      try {
        const input = GetUsersSchema.parse({
          q: req.query.q,
          token: req.headers.authorization,
        });
  
        const output = await this.userBusiness.getUsers(input);
  
        res.status(200).send(output);
      } catch (error) {
        console.log(error);
  
        if (error instanceof ZodError) {
          res.status(400).send(error.issues);
        } else if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message);
        } else {
          res.status(500).send("Erro inesperado");
        }
      }
    };
  
    public signup = async (req: Request, res: Response) => {
      try {
        const input = SignupSchema.parse({

          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
  
        const output = await this.userBusiness.signup(input);
  
        res.status(201).send(output);
      } catch (error) {
        console.log(error);
  
        if (error instanceof ZodError) {
          res.status(400).send(error.issues);
        } else if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message);
        } else {
          res.status(500).send("Erro inesperado");
        }
      }
    };
  
    public login = async (req: Request, res: Response) => {
      try {
        const input = LoginSchema.parse({
          email: req.body.email,
          password: req.body.password,
        });
  
        const output = await this.userBusiness.login(input);
  
        res.status(200).send(output);
      } catch (error) {
        console.log(error)
  
        if (error instanceof ZodError) {
          res.status(400).send(error.issues)
        } else if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.status(500).send("Erro inesperado")
        }
      }
    };
  
  }