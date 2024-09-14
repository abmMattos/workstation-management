const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class StationController {
  async findMany(request, response) {
    try {
      const station = await prisma.station.findMany();
      return response.json(station);
    } catch (err) {
      return response.status(409).send();
    }
  }

  async create(request, response) {
    try {
      const { name, type, status, capacity, hardwares } = request.body;
      const station = await prisma.station.create({
        data: {
          name,
          type,
          status,
          capacity,
          hardwares, // verificar se banco está correto e como fazer a inserção de chave estrangeira
        },
      });
      return response.json(station);
    } catch (err) {
      return response.status(409).send();
    }
  }
  
  async findUnique(request, response) {
    try {
      const { id } = request.body;
      const station = await prisma.station.findUnique({
        where: {
          id
        }
      });
      return response.json(station);
    } catch (err) {
      return response.status(409).send();
    }
  }
  
  async delete(request, response) {
    try {
      const { id } = request.body;
      const station = await prisma.station.delete({
        where: {
          id
        }
      });
      return response.json(station);
    } catch (err) {
      return response.status(409).send();
    }
  }

  async update(request, response) {
    try {
      const { id, name, type, status, capacity, hardwares } = request.body;
      const station = await prisma.station.update({
        where: {
          id: id,
        },
        data: {
            name,
            type,
            status,
            capacity,
            hardwares, // verificar se banco está correto e como fazer a inserção de chave estrangeira
          },
      });
      return response.json(station);
    } catch (err) {
      return response.status(409).send();
    }
  }
}

module.exports = StationController;
