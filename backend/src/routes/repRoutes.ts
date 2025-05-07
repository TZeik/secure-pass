import { Router } from "express";
import {RepVisitas} from "../controllers/repController";




const router= Router();

router.get('/visit', RepVisitas);

//outer.get('/visit', Repvisitas);

export default router;
