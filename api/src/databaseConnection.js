"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const apiResults_1 = require("./entites/apiResults");
const example_findings_json_1 = __importDefault(require("./example-findings.json"));
const databaseConn = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, typeorm_1.createConnection)();
        const resultRepository = (0, typeorm_1.getRepository)(apiResults_1.Result);
        const newResult = {
            status: 'Queued',
            repositoryName: 'example-repo',
            findings: example_findings_json_1.default,
            queuedAt: new Date(),
            scanningAt: null,
            finishedAt: null,
        };
        // Save the result entity
        const result = resultRepository.create(newResult);
        // Save the result entity
        yield resultRepository.save(result);
        console.log('Database connected successfully');
        yield connection.destroy();
    }
    catch (error) {
        console.error('Error connecting the database:', error);
    }
});
databaseConn().then(r => { });
