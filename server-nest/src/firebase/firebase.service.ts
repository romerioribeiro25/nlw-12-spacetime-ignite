import { Injectable } from '@nestjs/common';
import {
  getApps,
  cert,
  initializeApp,
  App,
  ServiceAccount,
} from 'firebase-admin/app';
import { getStorage, Storage } from 'firebase-admin/storage';
import { serviceAccountConfig } from 'src/config/service-account.config';

@Injectable()
export class FirebaseService {
  public app: App;
  public storage: Storage;

  constructor() {
    if (getApps().length === 0) {
      this.app = initializeApp({
        credential: cert(serviceAccountConfig as ServiceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        storageBucket: `${process.env.FIREBASE_BUCKET_NAME}.appspot.com`,
      });

      this.storage = getStorage(this.app);
    }
  }
}
