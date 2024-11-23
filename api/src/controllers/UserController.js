const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient()

class UserController {
    async create(request, response) {
        try {
            const { name, email, password } = request.body
            const users = await prisma.user.create({
                data: {
                    name,
                    email,
                    password
                }
            })
            return response.json(users)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async login(request, response) {
        try {
          const { email, password } = request.query;
          const user = await prisma.user.findUnique({
            where: {
              email: email,
              password: password,
            },
          });
    
          if (!user) {
            return response.status(400).send('Usuário não existe!');
          }
          const token = jwt.sign({ id: user.id }, 'chave', { expiresIn: 40000 });
          return response.status(200).json({ auth: true, token, user });
        } catch {
          return response.status(401).send('Login falhou!');
        }
      }

    async update(request, response) {
        try {
            const { id, name, email, password } = request.body
            const users = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    email,
                    password

                }
            })
            return response.json(users)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.body
            const users = await prisma.user.delete({
                where: {
                    id: id
                }
            })
            return response.json(users)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findMany(request, response) {
        try {
            const users = await prisma.user.findMany();
            return response.json(users)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findUnique(request, response) {
        try {
            const { id } = request.query
            const users = await prisma.user.findUnique({
                where: {
                    id: id
                },
                select: {
                    name: true,
                    email: true
                }
            })
            return response.json(users)
        } catch (err) {
            return response.status(409).send()
        }
    }

}

module.exports = UserController