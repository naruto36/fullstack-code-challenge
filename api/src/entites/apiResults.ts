import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Result {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({ type: 'enum', enum: ['Queued', 'In Progress', 'Success', 'Failure'] })
    status: 'Queued' | 'In Progress' | 'Success' | 'Failure' = 'Queued';

    @Column()
    repositoryName: string = '';

    @Column('jsonb')
    findings: any = {};

    @Column({ type: 'timestamp', nullable: true })
    queuedAt: Date | null = null;

    @Column({ type: 'timestamp', nullable: true })
    scanningAt: Date | null = null;

    @Column({ type: 'timestamp', nullable: true })
    finishedAt: Date | null = null;
}