import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 'user'})
    role: string;

    @Column({ default: true })
    status: boolean;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}