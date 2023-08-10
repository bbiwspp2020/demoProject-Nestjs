import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private MailService: MailService
  ) { }
  async create(createUserDto: CreateUserDto) {
    let x = await this.findByUsername(createUserDto.email)
    if (x === null) {
      this.MailService.postMail(createUserDto)
      return this.usersRepository.save(createUserDto)
    } else {
      throw new HttpException('Email already used', HttpStatus.CONFLICT);
    }

  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto)
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findByUsername(email: any): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
