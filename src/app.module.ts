import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { BooksModule } from './books/books.module';
import { MemberEntity } from './typeorm/entities/member.entity';
import { BooksTransactionModule } from './books-transaction/books-transaction.module';
import { BookEntity } from './typeorm/entities/book.entity';
import { BooksTransactionEntity } from './books-transaction/books-transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'eigen_test',
      entities: [MemberEntity, BookEntity, BooksTransactionEntity],
      synchronize: true,
    }),
    MembersModule,
    BooksModule,
    BooksTransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
