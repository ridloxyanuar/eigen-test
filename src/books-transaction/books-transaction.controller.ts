import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { BooksTransactionService } from './books-transaction.service';
import { BooksTransactionEntity } from './books-transaction.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BorrowBook } from 'src/types/borrow-book';

@ApiTags('Books Transaction')
@Controller('books-transaction')
export class BooksTransactionController {
    constructor(private readonly booksTransactionService: BooksTransactionService) { }

    @Get()
    @ApiOperation({ summary: 'Get all borrow history records' })
    @ApiResponse({ status: 200, description: 'Return all borrow history records.' })
    findAll() {
        return this.booksTransactionService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a borrow history record by ID' })
    @ApiResponse({ status: 200, description: 'Return the borrow history record.' })
    @ApiResponse({ status: 404, description: 'Borrow history record not found.' })
    findOne(@Param('id') id: number) {
        return this.booksTransactionService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new borrow history record' })
    @ApiResponse({ status: 201, description: 'The borrow history record has been created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    create(@Body() booksTransaction: BorrowBook) {
        return this.booksTransactionService.create(booksTransaction);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a borrow history record' })
    @ApiResponse({ status: 200, description: 'The borrow history record has been updated.' })
    @ApiResponse({ status: 404, description: 'Borrow history record not found.' })
    update(@Param('id') id: number, @Body() booksTransaction: BooksTransactionEntity) {
        return this.booksTransactionService.update(id, booksTransaction);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a borrow history record' })
    @ApiResponse({ status: 200, description: 'The borrow history record has been deleted.' })
    @ApiResponse({ status: 404, description: 'Borrow history record not found.' })
    remove(@Param('id') id: number) {
        return this.booksTransactionService.remove(id);
    }

    @Patch('return')
    @ApiOperation({ summary: 'Return a borrowed book' })
    @ApiResponse({ status: 200, description: 'The book has been returned.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    returnBook(@Body() { member_code, book_code }: { member_code: string; book_code: string }) {
        return this.booksTransactionService.returnBook(member_code, book_code);
    }
}
