const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient()

class HardwareController {


    async create(request, response) {
        try {
            const { screens, mouse, keyboard, webcam, headset, pliers, weldingMachine, antiStaticMat, socket110v, benchMagnifyingGlass} = request.body
            const workstations = await prisma.hardware.create({
                data: {
                    screens,
                    mouse,
                    keyboard,
                    webcam,
                    headset,
                    pliers,
                    weldingMachine,
                    antiStaticMat,
                    socket110v,
                    benchMagnifyingGlass,
                }
            })
            return response.json(workstations)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async update(request, response) {
        try {
            const { id, screens, mouse, keyboard, webcam, headset,pliers, weldingMachine, antiStaticMat, socket110v, benchMagnifyingGlass} = request.body
            const workstations = await prisma.hardware.update({
                where: {
                    id: id
                },
                data: {                 
                    screens,
                    mouse,
                    keyboard,
                    webcam,
                    headset,
                    pliers,
                    weldingMachine,
                    antiStaticMat,
                    socket110v,
                    benchMagnifyingGlass,
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
            const workstations = await prisma.hardware.delete({
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
            const workstations = await prisma.hardware.findMany();
            return response.json(workstations)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findUnique(request, response) {
        try {
            const { id } = request.body
            const workstation = await prisma.hardware.findUnique({
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

module.exports = HardwareController