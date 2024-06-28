import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksTransactionEntity } from './books-transaction.entity';
import { MemberEntity } from 'src/typeorm/entities/member.entity';
import { BookEntity } from 'src/typeorm/entities/book.entity';
import { BorrowBook } from 'src/types/borrow-book';

@Injectable()
export class BooksTransactionService {
    constructor(
        @InjectRepository(BooksTransactionEntity)
        private readonly booksTransactionRepository: Repository<BooksTransactionEntity>,
        @InjectRepository(MemberEntity)
        private readonly membersRepository: Repository<MemberEntity>,
        @InjectRepository(BookEntity)
        private readonly booksRepository: Repository<BookEntity>,
    ) { }

    async findAll(): Promise<BooksTransactionEntity[]> {
        return this.booksTransactionRepository.find();
    }

    async findOne(id: number): Promise<BooksTransactionEntity> {
        const booksTransaction = await this.booksTransactionRepository.findOneBy({ id });
        if (!booksTransaction) {
            throw new NotFoundException(`booksTransaction with ID ${id} not found`);
        }
        return booksTransaction;
    }

    async create(booksTransaction: BorrowBook) {
        const member = await this.membersRepository.findOneBy({ code: booksTransaction.member_code });
        const book = await this.booksRepository.findOneBy({ code: booksTransaction.book_code });

        if (!member || !book) {
            throw new BadRequestException('Invalid member or book code.');
        }

        if (member.penalized) {
            throw new BadRequestException('Member is currently penalized.');
        }

        const activeBorrows = await this.booksTransactionRepository.count({
            where: { member_code: booksTransaction.member_code, status: 'borrowed' },
        });

        if (activeBorrows >= 2) {
            throw new BadRequestException('Member cannot borrow more than 2 books.');
        }

        const isBookBorrowed = await this.booksTransactionRepository.findOne({
            where: { book_code: booksTransaction.book_code, status: 'borrowed' },
        });

        if (isBookBorrowed) {
            throw new BadRequestException('Book is currently borrowed by another member.');
        }

        booksTransaction.borrow_date = new Date();
        booksTransaction.status = 'borrowed';
        return this.booksTransactionRepository.save(booksTransaction);
    }

    async update(id: number, booksTransaction: BooksTransactionEntity) {
        return this.booksTransactionRepository.update(id, booksTransaction);
    }

    async remove(id: number) {
        return this.booksTransactionRepository.delete(id);
    }

    async returnBook(member_code: string, book_code: string) {
        const borrowRecord = await this.booksTransactionRepository.findOne({
            where: { member_code, book_code, status: 'borrowed' },
        });

        if (!borrowRecord) {
            throw new BadRequestException('No active borrow record found for this book and member.');
        }

        const now = new Date();
        const borrowedDate = new Date(borrowRecord.borrow_date);
        const diffDays = Math.ceil((now.getTime() - borrowedDate.getTime()) / (1000 * 3600 * 24));

        if (diffDays > 7) {
            await this.membersRepository.update({ code: member_code }, { penalized: true });
        }

        borrowRecord.return_date = now;
        borrowRecord.status = 'returned';
        return this.booksTransactionRepository.save(borrowRecord);
    }
}
