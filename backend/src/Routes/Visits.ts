import { Router } from "express";
import { getVisit } from "../controllers/RepController";

const router= Router();

router.get('/visitas', getVisit);


export default router;
