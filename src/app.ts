//it is worth noting that node does not execute ts rather it treats every code it runs as regular js, if there is a ts specific it encounters it flags and error, but unless that it compiles ts written with just js lingo
//you can use ts-node for compiling your ts with node combines tsc and node step in one step
//you use the ts syntax for import and export
//node will be "const express = require ('express')"
import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";

import todoRoutes from "./routes/todos";

const app = express();

app.use(json());

app.use("/todos", todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json(500).json({ message: err.message });
});

app.listen(3000);
