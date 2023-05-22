import { Injectable } from '@nestjs/common';
import {
  FirebaseStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class UploadService {
  private storage: FirebaseStorage;

  constructor(private firebaseService: FirebaseService) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    this.storage = this.firebaseService.storage;

    const fileRef = ref(this.storage, file.originalname);
    const snapshot = await uploadBytes(fileRef, file.buffer);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    // const fileRef = this.storage.ref().child(file.originalname);
    // const snapshot = await fileRef.put(file.buffer);
    // const downloadUrl = await snapshot.ref.getDownloadURL();
    return downloadUrl;
  }
}
