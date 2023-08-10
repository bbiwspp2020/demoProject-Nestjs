import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { FilesModule } from './files/files.module';
import { ProductModule } from './product/product.module';
import { MailModule } from './mail/mail.module';
import { GoogleStrategy } from './auth/google.strategy'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '103.76.183.192',
      port: 3306,
      username: 'project',
      password: 'Admin2016!',
      database: 'Biw',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    }),
    MulterModule,
    UsersModule,
    AuthModule,
    FilesModule,
    ProductModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService,GoogleStrategy],
})
export class AppModule { }
