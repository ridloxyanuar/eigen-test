import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MembersService } from './members.service';
import { MemberEntity } from 'src/typeorm/entities/member.entity';
import { ApiBody, ApiConflictResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMember } from 'src/types/create-member';

@ApiTags('members')
@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) { }

    @Get()
    @ApiOperation({ summary: 'Get all members' })
    @ApiResponse({ status: 200, description: 'Return all members.' })
    findAll() {
        return this.membersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a member by ID' })
    @ApiResponse({ status: 200, description: 'Return the member.' })
    @ApiResponse({ status: 404, description: 'Member not found.' })
    findOne(@Param('id') id: number) {
        return this.membersService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new member' })
    @ApiResponse({ status: 201, description: 'The member has been created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBody({ type: CreateMember })
    @ApiConflictResponse({ description: 'Member code already exists' })
    async create(@Body() createMemberDto: CreateMember): Promise<MemberEntity> {
        return this.membersService.create(createMemberDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a member' })
    @ApiResponse({ status: 200, description: 'The member has been updated.' })
    @ApiResponse({ status: 404, description: 'Member not found.' })
    update(@Param('id') id: number, @Body() member: MemberEntity) {
        return this.membersService.update(id, member);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a member' })
    @ApiResponse({ status: 200, description: 'The member has been deleted.' })
    @ApiResponse({ status: 404, description: 'Member not found.' })
    remove(@Param('id') id: number) {
        return this.membersService.remove(id);
    }
}
