import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  register(email: string, password: string): Promise<{ uid: string }> {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((cred) => {
      const uid = cred.user?.uid!;
      return this.firestore.collection('users').doc(uid).set({
        email,
        role: 'user'
      }).then(() => ({ uid }));
    });
  }
  

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  getUser(): Observable<any> {
    return this.afAuth.authState;
  }
  getUserRole(uid: string): Promise<string | null> {
    return this.firestore.collection('users').doc(uid).get().toPromise()
      .then(docSnap => {
        if (!docSnap || !docSnap.exists) {
          return null;
        }
        const data = docSnap.data() as { role?: string } | undefined;
        return data?.role ?? null;
      });
  }
  
  
  
  
}
