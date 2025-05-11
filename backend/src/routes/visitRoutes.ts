import { Router } from "express";
import { visitController } from "../controllers/visitController";
import { RepVisitas } from "../controllers/repController";

const router = Router();

// Realiza una consulta de todas las visitass
router.get('/visits', visitController.getAllVisits);

// Genera un reporte de visitas (Admin)
router.get('/visits/report', RepVisitas);

// Autoriza [crea] una visita (Residente)
router.post('/visits/authorize', visitController.authorizeVisit);

// Envia un Email de confirmación al residente autorizador sobre la autorización de visita
router.post('/visits/notify/:id', visitController.notifyVisit);

// Registra y valida la entrada de una visita (Guardia)
router.put('/visits/entry', visitController.registerEntry);

// Registra y valida la salida de una visita (Guardia)
router.put('/visits/exit', visitController.registerExit);

// Realiza una consulta una visita por su QR ID
router.get('/visits/qr/:qrId', visitController.getVisitByQR);

// Realiza una consulta de todas las visitas de un residente
router.get('/visits/resident/:residentId', visitController.getVisitsByResident);

// Realiza una consulta de todas las visitas registradas por un guardia
router.get('/visits/guard/:guardId', visitController.getVisitsByGuard);

// Realiza una consulta de una visita por su id
router.get('/visits/:id', visitController.getVisitById);

// Elimina a una visita por su id
router.delete('/visits/:id', visitController.deleteVisit);

// Cambia el estado de una visita por su id
router.patch('/visits/:id', visitController.updateVisitStatus);

export default router;