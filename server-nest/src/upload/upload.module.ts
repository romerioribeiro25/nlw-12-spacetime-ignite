import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, FirebaseService],
})
export class UploadModule {}
