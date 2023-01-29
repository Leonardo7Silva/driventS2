import ticketsTypeRepository from "@/repositories/tickets-repository";
import { ticketsType } from "@/protocols";
import { notFoundError } from "@/errors";

async function getTicketsTypes():Promise<ticketsType[]>{
    const result = await ticketsTypeRepository.getAllTicketsTypes();

    return result
};

async function getTickets(userId:number){

    const enrollment = await ticketsTypeRepository.getEnrollment(userId);
    if(!enrollment){
        throw notFoundError();
    }
    const result = await ticketsTypeRepository.getUserTickets(enrollment.id);
    if(!result){
        throw notFoundError();
    }
    return result
};

async function createTicket(userId: number, ticketTypeId: number){

    const enrollment = await ticketsTypeRepository.getEnrollment(userId);
    if(!enrollment){
        throw notFoundError();
    }
    const result = await ticketsTypeRepository.createTicket(ticketTypeId, enrollment.id)

    return result

}

const ticketTypeService = {
    getTicketsTypes,
    getTickets,
    createTicket
};

export default ticketTypeService;