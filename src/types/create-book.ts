import { ApiProperty } from '@nestjs/swagger';

export class CreateBook {
    @ApiProperty()
    code: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    stock: number;
}
