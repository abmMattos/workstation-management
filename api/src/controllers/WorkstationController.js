const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient()

class WorkstationController {


    async create(request, response) {
        try {
            const { name, identifier, screens, mouse, keyboard, webcam, description, isBlocked } = request.body
            const workstations = await prisma.workstation.create({
                data: {
                    identifier,
                    name,
                    screens,
                    mouse,
                    keyboard,
                    webcam,
                    description,
                    isBlocked
                }
            })
            return response.json(workstations)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async update(request, response) {
        try {
            const { id, name, identifier, screens, mouse, keyboard, webcam, description, isBlocked } = request.body
            const workstations = await prisma.workstation.update({
                where: {
                    id: id
                },
                data: {
                    identifier,
                    name,
                    screens,
                    mouse,
                    keyboard,
                    webcam,
                    description,
                    isBlocked

                }
            })
            return response.json(workstations)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.body
            const workstations = await prisma.workstation.delete({
                where: {
                    id: id
                }
            })
            return response.json(workstations)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findMany(response) {
        try {
            const workstations = await prisma.workstation.findMany();
            return response.json(workstations)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findUnique(request, response) {
        try {
            const { identifier } = request.body
            const workstations = await prisma.workstation.findUnique({
                where: {
                    identifier: identifier
                }
            })
            return response.json(workstations)
        } catch (err) {
            return response.status(409).send()
        }
    }

}

module.exports = WorkstationController