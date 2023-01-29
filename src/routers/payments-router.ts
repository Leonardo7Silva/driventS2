import { Router } from "express";
import { authenticateToken, validateBody} from "@/middlewares";
import { getPayments, newPayment } from "@/controllers";
import { createPaymentSchema } from "@/schemas"; 
const paymentRouter = Router();

paymentRouter
    .all("/*", authenticateToken)
    .get("/", getPayments)
    .post("/process", newPayment)

export {paymentRouter}