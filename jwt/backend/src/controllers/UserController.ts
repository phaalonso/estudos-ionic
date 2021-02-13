import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export default {
  async index(req: Request, res: Response) {
	  const usuarios = [{
		email: 'dsafhj@gmail.com',
		  senha: '123'
	  }, {
		  email: 'top@gmail.com',
		  senha: '123'
	  }]

	  return res.json(usuarios);
  },
  async login(request: Request, response: Response) {
    try {
      const { email, senha } = request.body;
      
      //Verificação somente para testes (substituir)
      if (email === senha) {
        const usuario = {
          email,
          senha,
        };
        
        const token = jwt.sign({ usuario }, process.env.ACCESS_TOKEN_SECRET as jwt.Secret, {
          expiresIn: 300, // expires in 5min
        });
        return response.json({
          token: token
        });
      }
    } catch (err) {
		console.error(err);
    }

    return response.status(500).json({ message: "Login inválido!" });
  },
};
