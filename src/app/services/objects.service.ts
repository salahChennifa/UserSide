import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import {News} from '../models/news'
@Injectable({
  providedIn: 'root'
})
export class ObjectsService {

  constructor(private afDb : AngularFireDatabase, private afs : AngularFirestore) {
    // this.getAllQuiz() 
  
  
  }


getAllQuiz(){
  // return this.afDb.list('Quiz').snapshotChanges(['child_added']);
  return this.afs.collection('quiz').valueChanges();
    
}

getQuizByNiveauAndQcm(niveau){
  return  this.afs.collection('quiz',
  ref => ref.where('niveau','==',  niveau)
  ).valueChanges()
}
addItemsClient(useritem:User){
  this.afs.collection('users').add(useritem);
}




listOfActualités(){
  return this.afs.collection('actualités').snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as News ;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
 }
}
