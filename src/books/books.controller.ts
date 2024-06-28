import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookEntity } from 'src/typeorm/entities/book.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateBook } from 'src/types/create-book';

@ApiTags('Books')
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get()
    @ApiOperation({ summary: 'Get all books' })
    @ApiResponse({ status: 200, description: 'Return all books.' })
    findAll() {
        return this.booksService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a book by ID' })
    @ApiResponse({ status: 200, description: 'Return the book.' })
    @ApiResponse({ status: 404, description: 'Book not found.' })
    findOne(@Param('id') id: number) {
        return this.booksService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new book' })
    @ApiResponse({ status: 201, description: 'The book has been created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBody({ type: CreateBook })
    create(@Body() book: CreateBook) {
        return this.booksService.create(book);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a book' })
    @ApiResponse({ status: 200, description: 'The book has been updated.' })
    @ApiResponse({ status: 404, description: 'Book not found.' })
    update(@Param('id') id: number, @Body() book: BookEntity) {
        return this.booksService.update(id, book);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a book' })
    @ApiResponse({ status: 200, description: 'The book has been deleted.' })
    @ApiResponse({ status: 404, description: 'Book not found.' })
    remove(@Param('id') id: number) {
        return this.booksService.remove(id);
    }
}
