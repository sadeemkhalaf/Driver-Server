import { Request, Response, NextFunction, Express } from "express";

const express = require("express");
const requestConfig: Express = express();

requestConfig.use(
  "*",
  async (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", "*");
    next();
  }
);

export { requestConfig };
