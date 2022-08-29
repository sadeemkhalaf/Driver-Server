import bodyParser from "body-parser";
import { Request, Response, Express } from "express";
import {
  FieldPacket,
  OkPacket,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/typings/mysql";
import { requestConfig } from "./config/AllowCors";
import DB from "./DB/Connections";

const port: number = 8080;
const express = require("express");
const app: Express = express();

// config request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestConfig);

("use strict");

app.get("/test", async (req: Request, res: Response): Promise<any> => {
  return res.status(200).send("text DONE");
});

app.post("/oneLocation", async (req: Request, res: Response): Promise<any> => {
  const { lat, lng } = req.body;

  console.log('update one location: ', { lat, lng });
  
  try {
    const resposne: [
      (
        | RowDataPacket[]
        | RowDataPacket[][]
        | OkPacket
        | OkPacket[]
        | ResultSetHeader
      ),
      FieldPacket[]
    ] = await DB.query(
      `INSERT INTO locations (lat, lang)
      VALUES (${lat}, ${lng})`
    );

    if (!!resposne && !!resposne.length)
      return res.status(201).send("INSERT DONE");
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.put("/listofLocations", async (req: Request, res: Response) => {
  const {
    listoflocations,
  }: {
    listoflocations: Array<{ lat: number | string; lng: string | number }>;
  } = req.body;

  for (let index = 0; index < listoflocations.length; index++) {
    const element: { lat: number | string; lng: string | number } =
      listoflocations[index];

    try {
      const resposne: [
        (
          | RowDataPacket[]
          | RowDataPacket[][]
          | OkPacket
          | OkPacket[]
          | ResultSetHeader
        ),
        FieldPacket[]
      ] = await DB.query(
        `INSERT INTO locations (lat, lang)
      VALUES (${element.lat ?? ""}, ${element.lng ?? ""})`
      );


      if (!!resposne && resposne?.length === index + 1) {
        console.log('UPDATE ALL DONE');
        return res.status(201).send("UPDATE ALL DONE");
      }
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }
  
});

app.listen(port, (): void => {
  console.log("Node is Connected on port", port);
});
