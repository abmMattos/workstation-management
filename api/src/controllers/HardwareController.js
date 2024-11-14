const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient()

class HardwareController {


    async create(request, response) {
        try {
            const { name } = request.body
            const hardware = await prisma.hardware.create({
                data: {
                   name
                }
            })
            return response.json(hardware)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async update(request, response) {
        try {
            const { id, name} = request.body
            const hardware = await prisma.hardware.update({
                where: {
                    id: id
                },
                data: {                 
                   name
                }
            })
            return response.json(hardware)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.body
            const hardware = await prisma.hardware.delete({
                where: {
                    id: id
                }
            })
            return response.json(hardware)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findMany(request, response) {
        try {
            const hardware = await prisma.hardware.findMany();
            return response.json(hardware)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findUnique(request, response) {
        try {
            const { id } = request.query
            const hardware = await prisma.hardware.findUnique({
                where: {
                    id
                },
            })
            return response.json(hardware)
        } catch {
            return response.status(409).send()
        }
    }

}

module.exports = HardwareController