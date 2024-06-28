import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from 'src/typeorm/entities/member.entity';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MemberEntity])],
    providers: [MembersService],
    controllers: [MembersController],
})
export class MembersModule { }
