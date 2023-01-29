import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import ticketTypeService from "@/services/ticketType-service";
import httpStatus from "http-status";
import { RequestError } from "@/protocols";

export async function getTicketsTypes(req:AuthenticatedRequest, res: Response){


    try{
        const ticketsTypes = await ticketTypeService.getTicketsTypes();

        return res.status(httpStatus.OK).send(ticketsTypes);
    } catch(error){
        res.sendStatus(httpStatus.NOT_FOUND)
    }
};

export async function getTickets(req:AuthenticatedRequest, res: Response){

    const {userId} = req;

    try{
        const ticket = await ticketTypeService.getTickets(userId);

        return res.status(httpStatus.OK).send(ticket);
    } catch(error){
        res.sendStatus(httpStatus.NOT_FOUND)
    }
};

export async function createTickets(req:AuthenticatedRequest, res: Response){

    const {userId} = req;
    const {ticketTypeId} =req.body

    if(!ticketTypeId){
        return res.sendStatus(400);
    }
    try{
        const ticketcreated = await ticketTypeService.createTicket(userId, ticketTypeId);
        
        const ticket = await ticketTypeService.getTickets(userId);
        return res.status(httpStatus.CREATED).send(ticket);
    } catch(error){
        res.sendStatus(httpStatus.NOT_FOUND)
    }
};
