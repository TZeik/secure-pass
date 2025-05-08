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
  getVisitsByGuard,
  authorizeVisit
} from "../controllers/visitController";
import { RepVisitas } from "../controllers/repController";

const router = Router();

// Realiza una consulta de todas las visitass
router.get('/visits', getAllVisits);

// Genera un reporte de visitas (Admin)
router.get('/visits/report', RepVisitas);

// Autoriza [crea] una visita (Residente)
router.post('/visits/authorize', authorizeVisit);

// Registra y valida la entrada de una visita (Guardia)
router.put('/visits/entry', registerEntry);

// Registra y valida la salida de una visita (Guardia)
router.put('/visits/exit', registerExit);

// Realiza una consulta una visita por su QR ID
router.get('/visits/qr/:qrId', getVisitByQR);

// Realiza una consulta de todas las visitas de un residente
router.get('/visits/resident/:residenteId', getVisitsByResident);

// Realiza una consulta de todas las visitas registradas por un guardia
router.get('/visits/guard/:guardId', getVisitsByGuard);

// Realiza una consulta de una visita por su id
router.get('/visits/:id', getVisitById);

// Elimina a una visita por su id
router.delete('/visits/:id', deleteVisit);

// Cambia el estado de una visita por su id
router.patch('/visits/:id', updateVisitStatus);

// Actualiza a una visita por su id
router.put('/visits/:id', updateVisit);

export default router;