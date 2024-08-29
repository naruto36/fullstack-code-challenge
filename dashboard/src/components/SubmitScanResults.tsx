import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import axios from 'axios';

const SubmitScanResults: React.FC = () => {
    const [repositoryName, setRepositoryName] = useState('');
    const [status, setStatus] = useState<'Queued' | 'In Progress' | 'Success' | 'Failure'>('Queued');
    const [findings, setFindings] = useState<string>('');
    const [queuedAt, setQueuedAt] = useState<Date | null>(null);
    const [scanningAt, setScanningAt] = useState<Date | null>(null);
    const [finishedAt, setFinishedAt] = useState<Date | null>(null);

    const handleSubmit = async () => {
        try {
            await axios.post('/api/results', {
                repositoryName,
                status,
                findings: JSON.parse(findings),
                queuedAt,
                scanningAt,
                finishedAt
            });
            alert('Scan result submitted successfully');
        } catch (error) {
            alert('Error submitting scan result');
        }
    };

    return (
        <Form>
            <Form.Field>
                <label>Repository Name</label>
                <Input
                    value={repositoryName}
                    onChange={(e) => setRepositoryName(e.target.value)}
                    placeholder="Repository Name"
                />
            </Form.Field>
            <Form.Field>
                <label>Status</label>
                <Input
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'Queued' | 'In Progress' | 'Success' | 'Failure')}
                    placeholder="Status"
                />
            </Form.Field>
            <Form.Field>
                <label>Findings (JSON)</label>
                <Input
                    value={findings}
                    onChange={(e) => setFindings(e.target.value)}
                    placeholder="Findings JSON"
                />
            </Form.Field>
            <Form.Field>
                <label>Queued At</label>
                <Input
                    type="datetime-local"
                    onChange={(e) => setQueuedAt(new Date(e.target.value))}
                />
            </Form.Field>
            <Form.Field>
                <label>Scanning At</label>
                <Input
                    type="datetime-local"
                    onChange={(e) => setScanningAt(new Date(e.target.value))}
                />
            </Form.Field>
            <Form.Field>
                <label>Finished At</label>
                <Input
                    type="datetime-local"
                    onChange={(e) => setFinishedAt(new Date(e.target.value))}
                />
            </Form.Field>
            <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
    );
};

export default SubmitScanResults;
