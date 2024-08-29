import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Result } from '../entites/apiResults';
import exampleFindings from '../example-findings.json';

export const createResult = async (req: Request, res: Response) => {
    try {
        const resultRepository = getRepository(Result);
        const result = resultRepository.create(req.body);
        const savedResult = await resultRepository.save(result);
        res.status(201).json(savedResult);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

export const getResults = async (req: Request, res: Response) => {
    try {
        const resultRepository = getRepository(Result);
        const results = await resultRepository.find();

        // We are fetching data from our json file
        results.forEach(result => {
            result.findings = exampleFindings;
        });

        res.status(200).json(results);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

export const getResultById = async (req: Request, res: Response) => {
    try {
        const resultRepository = getRepository(Result);
        const id = parseInt(req.params.id, 10);
        const result = await resultRepository.findOne({ where: { id } });
        if (!result) return res.status(404).json({ message: 'Result not found' });
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

export const updateResult = async (req: Request, res: Response) => {
    try {
        const resultRepository = getRepository(Result);
        const id = parseInt(req.params.id, 10);
        const result = await resultRepository.findOne({ where: { id } });
        if (!result) return res.status(404).json({ message: 'Result not found' });
        resultRepository.merge(result, req.body);
        const updatedResult = await resultRepository.save(result);
        res.status(200).json(updatedResult);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

export const deleteResult = async (req: Request, res: Response) => {
    try {
        const resultRepository = getRepository(Result);
        const id = parseInt(req.params.id, 10);
        const result = await resultRepository.findOne({ where: { id } });
        if (!result) return res.status(404).json({ message: 'Result not found' });
        await resultRepository.remove(result);
        res.status(204).end();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
