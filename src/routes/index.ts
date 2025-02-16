import { Router } from "express";
import paymentRoutes from "../app/payment/payment.route";

const router = Router();

router.use("/payments", paymentRoutes);

export default router;
