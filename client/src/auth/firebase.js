import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDG6k7rqnCh2l80tJBHeEoR57jgrESsG8I',
  authDomain: 'project-x-9d320.firebaseapp.com',
  projectId: 'project-x-9d320',
  storageBucket: 'project-x-9d320.appspot.com',
  messagingSenderId: '141377076340',
  appId: '1:141377076340:web:358e79cde8cb4e143ba521',
  measurementId: 'G-S0ZM2RZBQZ',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
