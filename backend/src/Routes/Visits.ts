import { Router } from "express";
import { getVisit } from "../controllers/RepController";

const router= Router();

router.get('api/visit', getVisit);


export default router;
