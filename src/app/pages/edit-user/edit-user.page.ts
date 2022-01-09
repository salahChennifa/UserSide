import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ObjectsService } from 'src/app/services/objects.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  infoUser : any;
  UserIsLogged :string;
  isLogged :boolean=false;
  newPhone:string;
  newBirth:Date;
  showBalance:boolean=false;

  task : AngularFireUploadTask;
  ref:AngularFireStorageReference;

  UpdatedItems : boolean = false;
  user : User ={
    
    userId:"",
    name:"",
    email:"",
    createAt:null,
    BirthDate:null,
    Phone:null,
    niveauUser:1,
    nbrPoints:25
  };
  id:string;
  constructor(private AuthSrvc : AuthService,
    private toastCtr : ToastController,private objcService : ObjectsService,private router : Router,
    private route: ActivatedRoute,private afs : AngularFirestore,private fst : AngularFireStorage,
    private authSrvc:AuthService) { }

  ngOnInit() {

 
    
    

    this.AuthSrvc.getAuth().subscribe(auth => {

      if(auth){

        let uid = auth.uid
        
        this.AuthSrvc.getProfieUser(uid)
        .subscribe(x => {
          this.user = x
          console.log("info inside edit", this.user)


        });
       
        this.user.userId = auth.uid;
        this.isLogged =  true;
        this.user.email = auth.email;
        this.user.name = auth.displayName;
        console.log(auth);
      
      }else{
        this.isLogged =false;
      }
    })
  }





  updateUser(){

 

 
    this.AuthSrvc.UpdateProfile(this.user.name,this.user.email).then(user =>{

      console.log('updated');

      this.toast('User Updated',"success")
    }).catch(error => {
      console.log(error.message);
    })
  }


  onUpdate(){
    
    console.log(this.user.userId);
    this.authSrvc.onUpdateUser(this.user);
    this.toast('User Updated',"success");
    // this.router.navigate(['/'])
  }


  addItems(){

    this.afs.collection('users').doc(this.user.userId).update({
      'Phone':this.newPhone,
      'BirthDate':this.newBirth,
      
    });
   

    this.UpdatedItems =true;
    this.toast('Items Added ',"success")
  }

 


  async toast(message,status){
    const toast = await this.toastCtr.create({

      message:message,
      position:'top',
      color:status,
      duration:2000
    });

    toast.present();
}


// onUpdateUser(){


//   this.AuthSrvc.updateUser(this.user)


// }



uploadImage(event:any){

  const id = Math.random().toString(32).substring(2);
  this.ref = this.fst.ref(id)
  this.task = this.ref.put(event.target.files[0])
  this.task.then((data) => {
    data.ref.getDownloadURL().then(url => {
      this.afs.collection('users').doc(this.user.userId).update({
        imageUrl : url
      })
    })
  })
  console.log('finish uploading...')
}



}
