import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app'
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {


  user : User
  constructor(private afauth : AngularFireAuth,private afs : AngularFirestore) { }



  ngOnInit(){
  
  }
  getAuth(){
    return this.afauth.authState.pipe(map(auth=>auth));
   }

   getProfieUser(uid){
    return this.afs.collection('users').doc(uid).valueChanges()
   }

  LoginUser(email:string,password:string){


    return new Promise((resolve,reject) =>{
      this.afauth.signInWithEmailAndPassword(email,password)
      //puisque un promise on utilise then
      .then((userData)=> 
      
      resolve(userData),
      (error) => reject(error))
    })
  }

  LoginWithGoogle(){
    return new Promise((resolve,reject) =>{
      this.afauth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider() )
      //puisque un promise on utilise then
      .then((userData)=> resolve(userData),
      (error) => reject(error))
    })
}


async UpdateProfile(displayName: string, email : string) {
  const profile = {
      displayName: displayName,
      email : email,
  }
  return (await this.afauth.currentUser).updateProfile(profile);
}



onUpdateUser(user:User){
  return this.afs.collection('users').doc(user.userId)
  .update(user);
}

Logout(){
  this.afauth.signOut();

}

RegisterUser(email:string,password:string, name: string){
  return new Promise((resolve,reject) =>{
    this.afauth.createUserWithEmailAndPassword(email,password)
    //puisque un promise on utilise then
    .then((userData)=> {
      resolve(userData)
      this.afs.collection('users').doc(userData.user.uid).set({
        'userId':userData.user.uid,
        'name':name,
        'email':email,
        'createAt':Date.now(),
        'niveauUser':1,
        'qcmState':0,
        'nbrPoints':0,
        'BirthDate':'',
        'Phone':'',
        'accepted':false,
        'imageUrl':""

      });
    }
    
    // this.SendVerificationMail();
    
    ,
    

    (error) => reject(error))
    
    // this.SendVerificationMail();
 .catch
  })
  
  
}


async SendVerificationMail() {
  (await this.afauth.currentUser).sendEmailVerification().then(() => {
      console.log('email sent');
  });
                             }

  getOne(id:string){

      return this.afs.collection('users').doc(id).valueChanges();
                        
     }

     getOneActualité(id:string){

      return this.afs.collection('actualités').doc(id).valueChanges();
                        
     }

     updateUser(id:string){
       this.afs.collection('users').doc(id).update(id);
     }
}
