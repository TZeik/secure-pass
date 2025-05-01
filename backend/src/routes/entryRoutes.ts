import { Router } from "express";
import { registerEntry, registerExit } from "../controllers/visitController";
const router = Router();

// Registrar entrada de visitas

/*
 @ruta POST /visit/entrada
 {
 "residente": "<ID Residente>",
 "guardia": "<ID Guardia>",
 "nombreVisitante": "<Nombre de visitante>",
 "documentoVisitante" "<Documento visitante>",
 "motivo": "<Motivo de la visita>",
 "imagenUrl": "URL imagen visita"
 }
*/


router.post("/visit/entrada", registerEntry);

// Registrar salida de visitas

/*
 @route PUT /visit/salida:qrId  <-- Se sustituye por el qrId generado en la entrada
 {
 "motivo": "<Motivo de salida>",
 "guardia": "<ID Guardia>",
 }
*/

router.put("/visit/salida:qrId", registerExit);

export default router;
