import { v4 as uuidv4 } from 'uuid'
import { Injectable } from '@nestjs/common'
import { Storage } from 'firebase-admin/storage'
import { FirebaseService } from 'src/firebase/firebase.service'
import { Express } from 'express'

@Injectable()
export class UploadService {
  private storage: Storage

  constructor(private readonly firebaseService: FirebaseService) {
    this.storage = this.firebaseService.storage
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = this.storage.bucket()

    const uuidFileName = uuidv4()
    const ext = file.mimetype.split('/')[1]
    const fileName = `${uuidFileName}.${ext}`

    const fileRef = bucket.file(fileName)
    await fileRef.save(file.buffer)

    const signedUrl = await fileRef.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    })

    // firebase/storage
    // const fileRef = ref(this.storage, file.originalname);
    // const snapshot = await uploadBytes(fileRef, file.buffer);
    // const downloadUrl = await getDownloadURL(snapshot.ref);
    return signedUrl[0]
  }
}
