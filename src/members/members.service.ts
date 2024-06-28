import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from 'src/typeorm/entities/member.entity';
import { CreateMember } from 'src/types/create-member';
import { Repository } from 'typeorm';

@Injectable()
export class MembersService {
    constructor(
        @InjectRepository(MemberEntity)
        private readonly membersRepository: Repository<MemberEntity>,
    ) { }

    async findAll(): Promise<MemberEntity[]> {
        return this.membersRepository.find();
    }

    async findOne(id: number): Promise<MemberEntity> {
        const member = await this.membersRepository.findOneBy({ id });
        if (!member) {
            throw new NotFoundException(`Member with ID ${id} not found`);
        }
        return member;
    }

    async create(createMemberDto: CreateMember): Promise<MemberEntity> {
        const member = this.membersRepository.create(createMemberDto);
        try {
            return await this.membersRepository.save(member);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Member code already exists');
            }
            throw error;
        }
    }

    update(id: number, member: MemberEntity) {
        return this.membersRepository.update(id, member);
    }

    remove(id: number) {
        return this.membersRepository.delete(id);
    }
}
