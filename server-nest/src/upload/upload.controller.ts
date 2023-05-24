import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileSizeInterceptor } from './filesize.interceptor'
import { UploadService } from './upload.service'

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'), FileSizeInterceptor)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    // Express.Multer.File,
  ): Promise<{ url: string }> {
    const downloadUrl = await this.uploadService.uploadFile(file)
    return { url: downloadUrl }
  }
}
