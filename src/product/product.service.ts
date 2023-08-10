import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto)
  }

  async findAll() {
    let response: any = []
    response = await this.productRepository.find()
    let total: number = response.length
    return {
      response,
      total
    }
  }
  findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
      updateProductDto.quantity === '0' ? updateProductDto.status = '0': ''
    return this.productRepository.update(id, updateProductDto)
  }

  async remove(id: any): Promise<void> {
    await this.productRepository.delete(id);

  }
}
