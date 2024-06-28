import { ApiProperty } from '@nestjs/swagger';

export class BorrowBook {
    @ApiProperty()
    book_code: string;

    @ApiProperty()
    member_code: string;

    @ApiProperty()
    borrow_date: Date;

    @ApiProperty()
    status: string;
}
