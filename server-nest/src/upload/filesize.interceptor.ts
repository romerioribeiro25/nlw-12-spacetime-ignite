import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

interface CustomRequest extends Request {
  file: Express.Multer.File;
}

@Injectable()
export class FileSizeInterceptor implements NestInterceptor {
  private readonly MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
  private readonly MAX_FILE_SIZE_MB = 5; // 5 MB

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const file = request.file;

    if (!file) {
      throw new BadRequestException('Arquivo não encontrado.');
    }

    if (file.size > this.MAX_FILE_SIZE_BYTES) {
      throw new BadRequestException(
        `O arquivo excede o tamanho máximo permitido de ${this.MAX_FILE_SIZE_MB}MB.`,
      );
    }

    return next.handle();
  }
}
