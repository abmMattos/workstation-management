const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class AdminController {
  async create(request, response) {
    try {
      const { name, email, password } = request.body;
      const admin = await prisma.admin.create({
        data: {
          name,
          email,
          password,
        },
      });
      return response.json(admin);
    } catch (err) {
      return response.status(409).send();
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.body;
      const admin = await prisma.admin.delete({
        where: {
          id: id,
        },
      });
      return response.json(admin);
    } catch (err) {
      return response.status(409).send();
    }
  }
  async findMany(request, response) {
    try {
        const admin = await prisma.admin.findMany();
        return response.json(admin)
    } catch (err) {
        return response.status(409).send()
    }
  }

  async findUnique(request, response) {
    try {
        const { email } = request.body
        const admin = await prisma.admin.findUnique({
            where: {
                email: email
            }
        })
        return  response.json(admin)
    } catch (err) {
        return response.status(409).send()
    }
}

  async update(request, response) {
    try {
      const { id, name, email, password } = request.body;
      const admin = await prisma.admin.update({
        where: {
          id: id,
        },
        data: {
            name,
            email,
            password
        },
      });
      return response.json(admin);
    } catch (err) {
      return response.status(409).send();
    }
  }
}

module.exports = AdminController;
