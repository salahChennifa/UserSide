import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  UserIsLogged :string;
  isLogged :boolean=false;
  user : User ={
    
    userId:"",
    name:"",
    email:"",
    createAt:null,
    BirthDate:null,
    Phone:null,
    niveauUser:1,
    nbrPoints:25,
    imageUrl:""
  };

  Quiz :any;
  items: any [] = [];
  infoUser: any
  constructor(private AuthSrvc : AuthService,private srvc : ObjectsService,
    private route : ActivatedRoute) {  }

  ngOnInit() {


 




    this.AuthSrvc.getAuth().subscribe(auth => {

        
   
      if(auth){
    
       this.user.userId = auth.uid;
        // this.isLogged =  true;

        // this.user.email = auth.email;
        this.AuthSrvc.getProfieUser(this.user.userId)
        .subscribe(x => {
          this.user = x;
          // console.log('solution', this.user);
      
       
             this.infoUser = x
           
          console.log("info inside login", this.infoUser)
  
       
         
       

        });
      }else{
        this.isLogged =false;
      }
    })


    // this.user.userId = this.route.snapshot.params['id'];
    // this.AuthSrvc.getOne(this..id).subscribe(reponse =>{
    //   this.clients = reponse;

    //   console.log(this.clients);
    // })
  }



  // getUser(){
  //   this.user.userId = this.route.snapshot.params['id'];
  //   this.AuthSrvc.getOne(this.user.userId).subscribe(reponse =>{
  //     this.user = reponse;

  //     console.log(this.user);
  //   })
  // }

}
