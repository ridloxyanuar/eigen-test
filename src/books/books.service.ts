import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/typeorm/entities/book.entity';
import { CreateBook } from 'src/types/create-book';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly booksRepository: Repository<BookEntity>,
    ) { }

    async findAll(): Promise<BookEntity[]> {
        return this.booksRepository.find();
    }

    async findOne(id: number): Promise<BookEntity> {
        const books = await this.booksRepository.findOneBy({ id });
        if (!books) {
            throw new NotFoundException(`books with ID ${id} not found`);
        }
        return books;
    }

    create(book: CreateBook) {
        return this.booksRepository.save(book);
    }

    update(id: number, book: BookEntity) {
        return this.booksRepository.update(id, book);
    }

    remove(id: number) {
        return this.booksRepository.delete(id);
    }
}
