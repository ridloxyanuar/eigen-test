import { Column, Entity, Int32, IsNull, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'borrow_history' })
export class BorrowHistoryEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true })
    book_code: string;

    @Column()
    member_code: string;

    @Column({ default: IsNull })
    borrow_date: Date;

    @Column({ default: IsNull })
    return_date: Date;

    @Column()
    status: string;

    @Column()
    created_at: Date;

}