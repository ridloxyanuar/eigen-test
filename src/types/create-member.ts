import { ApiProperty } from '@nestjs/swagger';

export class CreateMember {
    @ApiProperty()
    code: string;

    @ApiProperty()
    name: string;
}
