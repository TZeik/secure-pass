import { Request, Response } from "express";
import { Visit } from "../models/Visit";
import mongoose  from "mongoose";
import { Console } from "console";

export const getVisit = async (req: Request, res: Response) : Promise<void> => {
    try{
        const {Fdesde, Fhasta,Nresidente, Pvehiculo,Vestado } = req.query;
        const filtro={} as any;

        if(Fdesde && Fhasta){
            filtro.fechaEntrada= {
                $get: new Date (Fdesde as string),
                $lt: new Date (Fhasta as string)
            };
              }
        if (Nresidente){
            filtro.residente= Nresidente as string;

            }
        if (Pvehiculo){
            filtro.vehiculo= Pvehiculo as string;

            }

            const viewVisitas= await Visit.find(filtro).populate("residente").populate("Guardia").populate("Vehiculo").sort({ fechaEntrada: -1 }).exec();

            if (viewVisitas.length === 0) {
                res.status(404).json({ message: "No se encontraron visitas." });
                return;
            }

         }
         catch (err)
         {
            console.error("Error en la consulta", err);
            res.status(500).json({message: "Error en la consulta"});
            return
         };

};