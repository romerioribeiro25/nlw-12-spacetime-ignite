import { Injectable } from '@nestjs/common';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { firebaseConfig } from 'src/config/firebase.config';

@Injectable()
export class FirebaseService {
  public app: FirebaseApp;
  public storage: FirebaseStorage;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.storage = getStorage(this.app);
  }
}
