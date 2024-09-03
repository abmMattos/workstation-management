const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient()

class WorkstationController {


    async create(request, response) {
        try {
            const { name, screens, capacity, mouse, keyboard, webcam, headset,  isBlocked } = request.body
            const workstations = await prisma.workstation.create({
                data: {
                    name,
                    screens,
                    capacity,
                    mouse,
                    keyboard,
                    webcam,
                    headset,
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
            const { id, name, capacity, screens, mouse, keyboard, webcam, headset, isBlocked } = request.body
            const workstations = await prisma.workstation.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    capacity,
                    screens,
                    mouse,
                    keyboard,
                    webcam,
                    headset,
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

    async findMany(request, response) {
        try {
            const workstations = await prisma.workstation.findMany();
            return response.json(workstations)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findUnique(request, response) {
        try {
            const { id } = request.body
            const workstation = await prisma.workstation.findUnique({
                where: {
                    id
                },
            })
            return response.json(workstation)
        } catch {
            return response.status(409).send()
        }
    }

}

module.exports = WorkstationController