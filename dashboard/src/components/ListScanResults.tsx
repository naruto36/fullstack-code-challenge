import React, { useEffect, useState } from 'react';
import { Table, Label } from 'semantic-ui-react';
import axios from 'axios';

interface ScanResult {
    id: number;
    repositoryName: string;
    status: 'Queued' | 'In Progress' | 'Success' | 'Failure';
    findings: any;
    queuedAt: Date | null;
    scanningAt: Date | null;
    finishedAt: Date | null;
}

const ListScanResults: React.FC = () => {
    const [results, setResults] = useState<ScanResult[]>([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('/api/results');
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };

        fetchResults();
    }, []);

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Repository Name</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Findings</Table.HeaderCell>
                    <Table.HeaderCell>Timestamp</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {results.map((result) => (
                    <Table.Row key={result.id}>
                        <Table.Cell>{result.repositoryName}</Table.Cell>
                        <Table.Cell>{result.status}</Table.Cell>
                        <Table.Cell>
                            <Label color="blue">{result.findings.length}</Label>
                        </Table.Cell>
                        <Table.Cell>{result.status === 'Queued' ? result.queuedAt?.toISOString() : result.status === 'In Progress' ? result.scanningAt?.toISOString() : result.finishedAt?.toISOString()}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default ListScanResults;
