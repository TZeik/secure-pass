import { Router } from "express";
import {getVisit} from "../controllers/repController";



const router= Router();

router.get('api/visit', getVisit);


export default router;
