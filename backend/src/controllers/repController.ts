import { Request, Response } from "express";
import { Visit } from "../models/Visit";
import {User} from "../models/User";
import { Vehicle } from "../models/Vehicle";
import mongoose  from "mongoose";
import { Console } from "console";

interface ReportParam {

    Fdesde?: string;
    Fhasta?: string;
    Nresidente?: string;
    Pvehiculo?: string;
    Vestado?: string;

}

export const RepVisitas = async (req: Request, res: Response) : Promise<void> => {
    try{
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

            const viewVisitas= await Visit.find();
            if (viewVisitas.length === 0) {
                res.status(404).json({ message: "No se encontraron visitas." });
                return;
            }
            else {

                const VDataset= viewVisitas.map((visit) => ({
                    "Visitante": visit.nombreVisitante,
                    "Numero Documento": visit.documentoVisitante,
                    "Codigo Entrada": visit.qrId,
                    "Estado Solcitud": visit.estado,
                    "Motivo Entrada": visit.motivo,
                    "Fecha Autorizado": visit.fechaAutorizacion,
                    "Fecha Entrada": visit.fechaEntrada,
                    
                


                }));
            //res.status(200).json(viewVisitas);
            res.status(200).json(VDataset);
            
            }
         }
         catch (err)
         {
            console.error("Error en la consulta", err);
            res.status(500).json({ 
                message: "Error en la consulta",
                error: err,
            });
            return
         };

};
