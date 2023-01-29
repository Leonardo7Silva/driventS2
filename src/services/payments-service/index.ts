import paymentRepository from "@/repositories/payments-repository";
import { Payments, createPayment } from "@/protocols";
import { notFoundError, unauthorizedError } from "@/errors";

async function getPayment(ticketId: number, userId:number): Promise<Payments>{

    const result = await paymentRepository.getPayment(ticketId);
    if(!result){
        throw notFoundError();
    }
    const compare = await paymentRepository.getUserIdByTicketId(ticketId);
    if(userId !== compare.Enrollment.userId){
        throw unauthorizedError();
    }
    return result
};

async function createNewPayment(payment: createPayment, userId: number):Promise<Payments>{

    const findPrice = await paymentRepository.findPriceByTicketId(payment.ticketId)

    if(!findPrice){
        throw notFoundError();
    }

    const finduser = await paymentRepository.getUserIdByTicketId(payment.ticketId)

    if(finduser.Enrollment.userId !== userId){
        throw unauthorizedError();
    }

    const create = await paymentRepository.newPaymentToTicket(payment, findPrice.TicketType.price);

    const change = await paymentRepository.changePaymentStatus(payment.ticketId);
    const result = await paymentRepository.getPayment(payment.ticketId);

    return result
}

const paymentService = {
    getPayment,
    createNewPayment
};

export default paymentService;