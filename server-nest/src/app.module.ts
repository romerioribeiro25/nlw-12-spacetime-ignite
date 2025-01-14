import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UploadModule } from './upload/upload.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { MemoriesModule } from './memories/memories.module';

@Module({
  imports: [UploadModule, PrismaModule, AuthModule, UsersModule, MemoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
