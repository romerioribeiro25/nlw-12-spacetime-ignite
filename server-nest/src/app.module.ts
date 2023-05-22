import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { FirebaseService } from './firebase/firebase.service';

@Module({
  imports: [UploadModule],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
