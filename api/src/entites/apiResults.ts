import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Result {
    @PrimaryGeneratedColumn()
    id: number = 0; // Initialize with a default value, though in practice, this will be auto-generated

    @Column({ type: 'enum', enum: ['Queued', 'In Progress', 'Success', 'Failure'] })
    status: 'Queued' | 'In Progress' | 'Success' | 'Failure' = 'Queued'; // Default value

    @Column()
    repositoryName: string = ''; // Default value or initialization

    @Column('jsonb')
    findings: any = {}; // Default value or initialization

    @Column({ type: 'timestamp', nullable: true })
    queuedAt: Date | null = null; // Default value or initialization

    @Column({ type: 'timestamp', nullable: true })
    scanningAt: Date | null = null; // Default value or initialization

    @Column({ type: 'timestamp', nullable: true })
    finishedAt: Date | null = null; // Default value or initialization
}