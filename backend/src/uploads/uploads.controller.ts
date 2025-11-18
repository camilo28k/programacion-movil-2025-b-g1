import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

@Controller('upload')
export class UploadController {

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // carpeta donde se guardan los archivos
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const fileName = `img-${uniqueSuffix}${ext}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const protocol = req.protocol;
    const host = req.get('host');

    return {
      filename: file.filename,
      url: `${protocol}://${host}/uploads/${file.filename}`, // URL pública
    };
  }
}

