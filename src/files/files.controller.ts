import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, StreamableFile, Response, UploadedFiles, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { join } from 'path';
import { of } from 'rxjs';
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('uploads/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        cb(null, `${Date.now()}${'-'}${file.originalname}`)
      },
    })
  }))
  async upload(@UploadedFile() file: any,@Param('id') id: string) {
    return this.filesService.uploadfile(file,id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('images')
  csvStream(@Req() req, @Body('filename') filename: string, @Response({ passthrough: true }) res): StreamableFile {
    res.set({
      'Content-Type': 'text/plain'
    });
    const readStream = fs.createReadStream('uploads/' + filename);
    return new StreamableFile(readStream);
  }

  @Get('image/:filename')
  findImage(@Param('filename') filename,@Response() res){
    return of(res.sendFile(join(process.cwd(),'uploads/'+filename)))

  }
}
