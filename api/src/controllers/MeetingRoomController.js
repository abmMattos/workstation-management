const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient()

class MeetingRoomController {


    async create(request, response) {
        try {
            const { name, identifier, description, photo } = request.body
            const meetingRoom = await prisma.meetingRoom.create({
                data: {
                    identifier,
                    name,
                    description,
                    photo
                }
            })
            return response.json(meetingRoom)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async update(request, response) {
        try {
            const { id, name, identifier, description, photo } = request.body
            const meetingRoom = await prisma.meetingRoom.update({
                where: {
                    id: id
                },
                data: {
                    identifier,
                    name,
                    description,
                    photo

                }
            })
            return response.json(meetingRoom)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.body
            const meetingRoom = await prisma.meetingRoom.delete({
                where: {
                    id: id
                }
            })
            return response.json(meetingRoom)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findMany(request, response) {
        try {
            const meetingRoom = await prisma.meetingRoom.findMany();
            return response.json(meetingRoom)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findUnique(request, response) {
        try {
            const { identifier } = request.body
            const meetingRoom = await prisma.meetingRoom.findUnique({
                where: {
                    identifier: identifier
                }
            })
            return response.json(meetingRoom)
        } catch (err) {
            return response.status(409).send()
        }
    }

}

module.exports = MeetingRoomController