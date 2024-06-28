import { ApiProperty } from '@nestjs/swagger';

export class BorrowBook {
    @ApiProperty()
    book_code: string;

    @ApiProperty()
    member_code: string;

    @ApiProperty()
    return_date: Date;

    @ApiProperty()
    status: string;
}
