import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

interface Finding {
    ruleId: string;
    description: string;
    severity: string;
    location: {
        path: string;
        positions: {
            begin: {
                line: number;
            };
        };
    };
}

interface FindingsListProps {
    resultId: number;
}

const FindListScanResults: React.FC<FindingsListProps> = ({ resultId }) => {
    const [findings, setFindings] = useState<Finding[]>([]);

    useEffect(() => {
        const fetchFindings = async () => {
            try {
                const response = await axios.get(`/api/results/${resultId}`);
                setFindings(response.data.findings);
            } catch (error) {
                console.error('Error fetching findings:', error);
            }
        };

        fetchFindings().then(r => fetchFindings());
    }, [resultId]);

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Rule ID</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Severity</Table.HeaderCell>
                    <Table.HeaderCell>Path: Line Number</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {findings.map((finding, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{finding.ruleId}</Table.Cell>
                        <Table.Cell>{finding.description}</Table.Cell>
                        <Table.Cell>{finding.severity}</Table.Cell>
                        <Table.Cell>{finding.location.path}: {finding.location.positions.begin.line}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default FindListScanResults;
