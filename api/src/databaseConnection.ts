import { createConnection, getRepository } from 'typeorm';
import { Result } from './entites/apiResults';
import exampleFindings from './example-findings.json';

const databaseConn = async () => {
    try {
        const connection = await createConnection();
        const resultRepository = getRepository(Result);

        const newResult: Partial<Result> = {
            status: 'Queued',
            repositoryName: 'example-repo',
            findings: exampleFindings,
            queuedAt: new Date(),
            scanningAt: null,
            finishedAt: null,
        };

        // Save the result entity
        const result = resultRepository.create(newResult);

        // Save the result entity
        await resultRepository.save(result);
        console.log('Database connected successfully');

        await connection.destroy();
    } catch (error) {
        console.error('Error connecting the database:', error);
    }
};

databaseConn().then(r => {});
