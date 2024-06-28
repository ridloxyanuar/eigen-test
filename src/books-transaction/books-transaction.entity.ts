import { Column, Entity, IsNull, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'books_transaction' })
export class BooksTransactionEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    book_code: string;

    @Column()
    member_code: string;

    @Column({ nullable: true })
    borrow_date: Date;

    @Column({ nullable: true })
    return_date: Date;

    @Column()
    status: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

}