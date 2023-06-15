"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//it is worth noting that node does not execute ts rather it treats every code it runs as regular js, if there is a ts specific it encounters it flags and error, but unless that it compiles ts written with just js lingo
//you can use ts-node for compiling your ts with node combines tsc and node step in one step
//you use the ts syntax for import and export
//node will be "const express = require ('express')"
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const todos_1 = __importDefault(require("./routes/todos"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use("/todos", todos_1.default);
app.use((err, req, res, next) => {
    res.json(500).json({ message: err.message });
});
app.listen(3000);
