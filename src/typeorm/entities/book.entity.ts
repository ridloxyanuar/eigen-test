import { Column, Entity, Int32, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'books' })
export class BookEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true })
    code: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column({ type: 'int' })
    stock: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

}