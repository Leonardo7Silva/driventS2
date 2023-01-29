import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import { createPayment } from "@/protocols";
import paymentService from "@/services/payments-service";
import httpStatus from "http-status";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
    const {ticketId} = req.query
    const {userId} = req

    if(!ticketId){
        return res.sendStatus(400);
    }
    const ticketNumber = Number(ticketId)

    try{
        const result = await paymentService.getPayment(ticketNumber, userId);

        res.status(httpStatus.OK).send(result);

    }catch(error){
        if(error.name === "UnauthorizedError"){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        if (error.name === "NotFoundError") {
            return res.send(httpStatus.NOT_FOUND);
          }
    }
};

export async function newPayment(req: AuthenticatedRequest, res: Response){
    const payment = req.body as createPayment
    const {userId} = req

    if(!payment.ticketId || !payment.cardData){
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    try{
        const result = await paymentService.createNewPayment(payment, userId)

        res.status(httpStatus.OK).send(result)
    }catch(error){
        if (error.name === "NotFoundError") {
            return res.send(httpStatus.NOT_FOUND);
          }
        if(error.name === "UnauthorizedError"){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
    }
}