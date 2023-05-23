import { Injectable } from '@nestjs/common';
import { Storage } from 'firebase-admin/storage';
// import {
//   FirebaseStorage,
//   ref,
//   uploadBytes,
//   getDownloadURL,
// } from 'firebase/storage';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class UploadService {
  private storage: Storage;

  constructor(private firebaseService: FirebaseService) {
    this.storage = this.firebaseService.storage;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = this.storage.bucket();
    const ext = file.mimetype.split('/')[1];
    console.log();
    const fileName = `novo_arquivo.${ext}`;
    const fileRef = bucket.file(fileName);
    await fileRef.save(file.buffer);

    const signedUrl = await fileRef.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });

    // // const fileRef = ref(this.storage, file.originalname);
    // // const snapshot = await uploadBytes(fileRef, file.buffer);
    // // const downloadUrl = await getDownloadURL(snapshot.ref);
    return signedUrl[0];
  }
}
