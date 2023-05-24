import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { UploadController } from './upload.controller'
import { FirebaseModule } from 'src/firebase/firebase.module'

@Module({
  imports: [FirebaseModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
