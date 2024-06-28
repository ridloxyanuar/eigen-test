import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksTransactionEntity } from './books-transaction.entity';
import { BooksTransactionService } from './books-transaction.service';
import { BooksTransactionController } from './books-transaction.controller';
import { BookEntity } from 'src/typeorm/entities/book.entity';
import { MemberEntity } from 'src/typeorm/entities/member.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BooksTransactionEntity, BookEntity, MemberEntity])],
    providers: [BooksTransactionService],
    controllers: [BooksTransactionController]
})
export class BooksTransactionModule { }
