const { PrismaClient } = require("@prisma/client");



const prisma = new PrismaClient()

class ReservationController {

    async reserveWorkstation(request, response) {
        try {
            const { dateReserve, motive, guests, user_id, workstation_id } = request.body
            const reservation = await prisma.reservation.create({
                data: {
                    dateReserve,
                    motive,
                    guests,
                    user_id,
                    workstation_id
                }
            })
            return response.json(reservation)
        } catch (err) {
            return response.status(409).send(err)
        }
    }

    async reserveMeetingRoom(request, response) {
        try {
            const { dateReserve, motive, guests, user_id, meetingroom_id } = request.body
            const reservation = await prisma.reservation.create({
                data: {
                    dateReserve,
                    motive,
                    guests,
                    user_id,
                    meetingroom_id
                }
            })
            return response.json(reservation)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async update(request, response) {
        try {
            const { id, dateReserve, motive, guests } = request.body
            const reservation = await prisma.reservation.update({
                where: {
                    id: id
                },
                data: {
                    dateReserve,
                    motive,
                    guests

                }
            })
            return response.json(reservation)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.body
            const reservation = await prisma.reservation.delete({
                where: {
                    id: id
                }
            })
            return response.json(reservation)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findMany(request, response) {
        try {
            const reservation = await prisma.reservation.findMany();
            return response.json(reservation)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findManyWorkstation(request, response) {
        var dataA = new Date();
        var dataAtual = new Date(dataA.getTime() - (dataA.getTimezoneOffset() * 60000));
        dataAtual.setUTCHours(0, 0, 0, 0);
        dataAtual = dataAtual.toJSON();
        try {
            const reservation = await prisma.reservation.findMany({
                where: {
                    dateReserve: {
                        equals: dataAtual
                    },
                    meetingroom_id: {
                        equals: null
                    }
                }
            });
            return response.json(reservation)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findManyMeetingRoom(request, response) {
        var dataA = new Date();
        var dataAtual = new Date(dataA.getTime() - (dataA.getTimezoneOffset() * 60000));
        dataAtual.setUTCHours(0, 0, 0, 0);
        dataAtual = dataAtual.toJSON();
        try {
            const reservation = await prisma.reservation.findMany({
                where: {
                    dateReserve: {
                        equals: dataAtual
                    },
                    workstation_id: {
                        equals: null
                    }
                }
            });
            return response.json(reservation)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findReservedWorkstationByDate(request, response) {
        const { id, date } = request.query;

        dataAtual = dataAtual.toJSON();
        try {
            const reservation = await prisma.reservation.findMany({
                where: {
                    workstation_id: {
                        equals: id
                    },
                    dateReserve: {
                        equals: date
                    },
                    meetingroom_id: {
                        equals: null
                    }
                }
            });
            return response.json(reservation)
        } catch (err) {
            return response.status(409).send()
        }
    }

    async findReservedMeetingRoomByDate(request, response) {
        const { id,date } = request.query;
        try {
            const reservation = await prisma.reservation.findMany({
                where: {
                    meetingroom_id: {
                        equals: id
                    },
                    dateReserve: {
                        equals: date
                    },
                    workstation_id: {
                        equals: null
                    }
                }
            });
            return response.json(reservation)
        } catch (err) {
            return response.status(409).send()
        }
    }

}

module.exports = ReservationController