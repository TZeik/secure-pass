import { Request, Response } from "express";
import { VisitService } from "../services/VisitService";

interface   Param {
  Fdesde?: string;
  Fhasta?: string;
  Nresidente?: string;
  Pvehiculo?: string;
  Vestado?: string;
}

export const RepVisitas = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //  const {Fdesde, Fhasta,Nresidente, Pvehiculo,Vestado } = req.query;
    // const filtro={} as any;

    // if(Fdesde && Fhasta){
    //    filtro.fechaEntrada= {
    //       $gte: new Date (Fdesde as string),
    //      $lte: new Date (Fhasta as string)
    // };
    //  }

    /*     if (Nresidente){
            filtro.residente= Nresidente as string;

      if (visita.qrId) reportItem.qrId = visita.qrId;
      if (visita.imagenUrl) reportItem.imagenUrl = visita.imagenUrl;

            }
            
            */
    //const viewVisitas= await Visit.find(filtro).populate("residente").populate("nombre").populate("Vehiculo").sort({ fechaEntrada: -1 }).exec();

    const viewVisitas = await VisitService.getAllVisits();
    if (viewVisitas.length === 0) {
        res.status(404).json({ message: "No se encontraron visitas." });
        return;
      }
      const VDataset = viewVisitas.map((v) => ({
        "Visitante": v.visit.name,
        "Numero Documento": v.visit.document,
        "Codigo Entrada": v.qrId,
        "Estado Solcitud": v.authorization.state,
        "Motivo Entrada": v.authorization.reason,
        "Fecha Autorizado": v.authorization.date,
        "Fecha Entrada": v.registry?.entry,
      }));
      //res.status(200).json(viewVisitas);
      res.status(200).json(VDataset);

  } catch (err) {
    console.error("Error en la consulta", err);
    res.status(500).json({
      message: "Error en la consulta",
      error: err,
    });
    return;
  }
};
