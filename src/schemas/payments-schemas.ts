import Joi from "joi";
import { createPayment } from "@/protocols";

export const createPaymentSchema = Joi.object<createPayment>({
    ticketId: Joi.number().required(),
    cardData: Joi.object({
      issuer:Joi.string().required(),
      number: Joi.number().required(),
      name: Joi.string().required(),
      expirationDate: Joi.date().required(),
      cvv: Joi.number().required()
    }).required()
  
  })
  