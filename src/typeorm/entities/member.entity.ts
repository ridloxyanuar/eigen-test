import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'members' })
export class MemberEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    @ApiProperty({ description: 'The unique identifier of the member' })
    id: number;

    @Column({ unique: true })
    code: string;

    @Column()
    name: string;

    @Column({ default: false })
    penalized: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

}