"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiResultRoutes_1 = __importDefault(require("./routes/apiResultRoutes"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/results', apiResultRoutes_1.default);
database_1.default.initialize()
    .then(() => {
    console.log('Connected to the database!');
})
    .catch((error) => {
    console.error('Database connection error:', error);
});
