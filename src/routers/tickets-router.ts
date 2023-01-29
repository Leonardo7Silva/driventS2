import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketsTypes, getTickets, createTickets } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
    .all("/*", authenticateToken)
    .get("/types", getTicketsTypes)
    .get("/", getTickets)
    .post("/",createTickets)


export {ticketsRouter}
