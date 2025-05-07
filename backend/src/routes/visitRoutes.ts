import { Router } from "express";
import { 
  registerEntry,
  registerExit,
  getAllVisits,
  getVisitById,
  getVisitByQR,
  updateVisitStatus,
  updateVisit,
  deleteVisit,
  getVisitsByResident,
  getVisitsByGuard
} from "../controllers/visitController";
import { RepVisitas } from "../controllers/repController";

const router = Router();

// Registro de visitas
router.post('/visits/entry', registerEntry);
router.put('/visits/exit/:qrId', registerExit);

// Consultas de visita
router.get('/visit/:id', getVisitById);
router.delete('/visit/:id', deleteVisit);
router.patch('/visit/:id/status', updateVisitStatus);
router.put('/visit/:id', updateVisit);
router.get('/visit/qr/:qrId', getVisitByQR);

// Consultas a varias visitas
router.get('/visits', getAllVisits);
router.get('/visits/resident/:residenteId', getVisitsByResident);
router.get('/visits/guard/:guardId', getVisitsByGuard);

// Ruta para reportes de visitas
router.get('/visits/report', RepVisitas);


export default router;