import { prisma } from "@/config";
import { TicketType } from "@prisma/client";

async function getAllTicketsTypes(){
    return prisma.ticketType.findMany()
};

async function getEnrollment(userId: number) {
    return prisma.enrollment.findFirst({
        where: { userId },
        include: {
          Address: true,
        },
      });
}

async function getUserTickets(enrollmentId:number){
    return prisma.ticket.findFirst({
        where:{
            enrollmentId
        },
        include: {
            TicketType:true
        }
    })
}

async function createTicket(ticketTypeId: number, enrollmentId: number){
    return prisma.ticket.create({
        data:{
            ticketTypeId,
            enrollmentId,
            status: "RESERVED"
        }
    });
}

const ticketsTypeRepository = {
    getAllTicketsTypes,
    getUserTickets,
    getEnrollment,
    createTicket
};

export default ticketsTypeRepository