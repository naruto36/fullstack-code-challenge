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
exports.deleteResult = exports.updateResult = exports.getResultById = exports.getResults = exports.createResult = void 0;
const typeorm_1 = require("typeorm");
const apiResults_1 = require("../entites/apiResults");
const example_findings_json_1 = __importDefault(require("../example-findings.json"));
const createResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultRepository = (0, typeorm_1.getRepository)(apiResults_1.Result);
        const result = resultRepository.create(req.body);
        const savedResult = yield resultRepository.save(result);
        res.status(201).json(savedResult);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createResult = createResult;
const getResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultRepository = (0, typeorm_1.getRepository)(apiResults_1.Result);
        const results = yield resultRepository.find();
        // We are fetching data from our json file
        results.forEach(result => {
            result.findings = example_findings_json_1.default;
        });
        res.status(200).json(results);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getResults = getResults;
const getResultById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultRepository = (0, typeorm_1.getRepository)(apiResults_1.Result);
        const result = yield resultRepository.findOne(req.params.id);
        if (!result)
            return res.status(404).json({ message: 'Result not found' });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getResultById = getResultById;
const updateResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultRepository = (0, typeorm_1.getRepository)(apiResults_1.Result);
        const result = yield resultRepository.findOne(req.params.id);
        if (!result)
            return res.status(404).json({ message: 'Result not found' });
        resultRepository.merge(result, req.body);
        const updatedResult = yield resultRepository.save(result);
        res.status(200).json(updatedResult);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateResult = updateResult;
const deleteResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultRepository = (0, typeorm_1.getRepository)(apiResults_1.Result);
        const result = yield resultRepository.findOne(req.params.id);
        if (!result)
            return res.status(404).json({ message: 'Result not found' });
        yield resultRepository.remove(result);
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteResult = deleteResult;
