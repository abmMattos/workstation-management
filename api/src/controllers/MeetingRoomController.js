const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient()

class MeetingRoomController {


    async create(request, response) {
        try {
            const { name, identifier, description, photo } = request.body
            const meeting_rooms = await prisma.meeting_room.create({
                data: {
                    identifier,
                    name,
                    description,
                    photo
                }
            })
            return response.json(meeting_rooms)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async update(request, response) {
        try {
            const { id, name, identifier, description, photo } = request.body
            const meeting_rooms = await prisma.meeting_room.update({
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
            return response.json(meeting_rooms)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.body
            const meeting_rooms = await prisma.meeting_room.delete({
                where: {
                    id: id
                }
            })
            return response.json(meeting_rooms)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findMany(response) {
        try {
            const meeting_rooms = await prisma.meeting_room.findMany();
            return response.json(meeting_rooms)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findUnique(request, response) {
        try {
            const { identifier } = request.body
            const meeting_rooms = await prisma.meeting_room.findUnique({
                where: {
                    identifier: identifier
                }
            })
            return response.json(meeting_rooms)
        } catch (err) {
            return response.status(409).send()
        }
    }

}

module.exports = MeetingRoomController