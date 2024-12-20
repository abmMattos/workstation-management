const { PrismaClient } = require("@prisma/client");
const { equal } = require("assert");



const prisma = new PrismaClient()

class ReservationController {

    async reserveStation(request, response) {
        try {
            const { dateReserve, motive, guests, user_id, station_id } = request.body
            const reservation = await prisma.reservation.create({
                data: {
                    dateReserve,
                    motive,
                    guests,
                    user_id,
                    station_id
                }
            })
            return response.json(reservation)
        } catch (err) {
            return response.status(409).send(err)
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
        const currentDate = new Date();
        const currentDateWithoutHours = new Date(currentDate.setHours(0, 0, 0, 0));
    
        try {
            const reservations = await prisma.reservation.findMany({
                where: {
                    dateReserve: {
                        gte: currentDateWithoutHours,
                    }
                },
                include: {
                    fk_user_id: {
                        select: {
                            email: true,
                            name: true,
                        }
                    }
                }
            });
    
            return response.json(reservations);
        } catch (err) {
            console.error(err);
            return response.status(409).send();
        }
    }

    async findReservedByDate(request, response) {
        const { id, date } = request.query;

        try {
            const reservation = await prisma.reservation.findMany({
                where: {
                    station_id: {
                        equals: id
                    },
                    dateReserve: {
                        equals: date
                    }
                }
            });
            return response.json(reservation)
        } catch (err) {
            return response.status(409).send()
        }
    }
    
    async findReservationByUserId(request, response) {
        const { user_id } = request.query;
        const currentDate = new Date();
        const currentDateWithoutHours = new Date(currentDate.setHours(0, 0, 0, 0));
        try {
            const reservation = await prisma.reservation.findMany({
                where: {
                    user_id: {
                        equal: user_id
                    },
                    dateReserve: {
                        gte: currentDateWithoutHours
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