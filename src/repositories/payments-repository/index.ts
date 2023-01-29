import { prisma } from "@/config";
import { createPayment } from "@/protocols";

async function getPayment(ticketId: number){
    return prisma.payment.findFirst({
        where:{
            ticketId
        }
    })
}

async function getUserIdByTicketId(ticketId: number){

    return prisma.ticket.findFirst({
        where: {id:ticketId},
        select:{
            Enrollment:{
                select:{
                    userId: true
                }
            }
        }
    })

}

async function changePaymentStatus(ticketId: number){
    return prisma.ticket.update({
        where:{id: ticketId},
        data:{status: "PAID"}
    })
}

async function newPaymentToTicket(payment: createPayment, price: number){
    const lastNumbers = payment.cardData.number.toString().slice(-4)
    return prisma.payment.create({
        data:{
            ticketId:payment.ticketId,
            cardIssuer:payment.cardData.issuer,
            cardLastDigits:lastNumbers,
            value: price
        }
    })
};

async function findPriceByTicketId(ticketId: number){
    return prisma.ticket.findFirst({
        where:{id: ticketId},
        select:{
            TicketType:{
                select:{
                    price: true
                }
            }
        }
    })
};



const paymentRepository = {
    getPayment,
    getUserIdByTicketId,
    findPriceByTicketId,
    newPaymentToTicket,
    changePaymentStatus
}

export default paymentRepository