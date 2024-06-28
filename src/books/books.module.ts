import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BookEntity } from 'src/typeorm/entities/book.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity])],
    providers: [BooksService],
    controllers: [BooksController],
})
export class BooksModule { }
