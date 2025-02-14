import { provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { initializeApp } from 'firebase/app';
import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: 'AIzaSyCLtCWY0ASQ_s0Gwq273kmQPsVwhvkGbJ8',
  authDomain: 'el-mejor-chat-del-mundo-32615.firebaseapp.com',
  projectId: 'el-mejor-chat-del-mundo-32615',
  storageBucket: 'el-mejor-chat-del-mundo-32615.firebasestorage.app',
  messagingSenderId: '1072551109710',
  appId: '1:1072551109710:web:347699f2e49a65b31b0f1f',
  measurementId: 'G-FSDJJGN9VT',
  databaseURL:
    'https://el-mejor-chat-del-mundo-32615-default-rtdb.firebaseio.com/',
};

const app = initializeApp(firebaseConfig);

export const appConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => app),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
  ],
};
