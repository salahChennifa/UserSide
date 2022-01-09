import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage implements OnInit {


  email:string;
  password:string;
  infoUser: any
  getValue:string

  user : User ={
    
    userId:"",
    name:"",
    email:"",
    createAt:null,
    BirthDate:null,
    Phone:null,
    niveauUser:1,
    nbrPoints:25,
    accepted:false
  };

  constructor(private authService : AuthService,
    private afauth:AngularFireAuth,
    private toastr:ToastController,
    private router : Router,private route: ActivatedRoute,
    private loadt : LoadingController) { }

  ngOnInit() {
    
  }

  //Simple Login ...

 async onLogin(){


  if (this.email, this.password){
    const load = await this.loadt.create({
      message:'loading..',
      spinner:'crescent',
      showBackdrop:true

    });
      load.present();
    
    
    this.authService.LoginUser(this.email,this.password)

    .then((auth: any) => {
    
      load.dismiss();
      if(auth) {
        
        let uid = auth.user.uid
        console.log("auth: ", auth.user.uid)
        
        this.authService.getAuth().subscribe(auth => {
    
         
          if(auth){
    
            // this.uid = auth.uid;
            // this.isLogged =  true;
    
            // this.user.email = auth.email;
            this.authService.getProfieUser(uid)
            .subscribe(x => {
              this.user = x;
              // console.log('solution', this.user);
              if(this.user.accepted === false){

                // console.log(`User ${this.user.name} vous devez attendre l'acceptation d'administrateur, Merci`);
                return new Promise((resolve,reject) => {

                let x = this.user.accepted === false
             
                  if(x){
             
                     return resolve (alert(`User ${this.user.name} vous devez attendre l'acceptation d'administrateur, Merci`));
                  }else {
             
                     return reject ("user not found");
                  }
             
                 })
               
                // this.toast("Attendre","danger");

              }
              else{
                 this.infoUser = x
               
              console.log("info inside login", this.infoUser)
              // this.router.navigate(['details',{item:item}])

              // this.getValue= this.route.snapshot.paramMap.get("item")
              let navigationExtra : NavigationExtras = {
                state: {
                  user: this.infoUser
                }
              }
              this.router.navigate(['/home'], navigationExtra);
              }
             
           

            });
          }else{
            //this.isLogged =false;
          }
        })
        
      }
      
    })
    .catch(error => {
      // load.dismiss();
      this.toast("The password is invalid or the user does not have a password.","danger");
      
      alert('user NOT connected ' );
      load.dismiss();
    })
  }
 }

  //Login with Google


  OnLoginWithGoogle(){
    this.authService.LoginWithGoogle()

    .then(auth => {
      if(auth) {
        

      this.authService.getAuth().subscribe(userEmail => {
        console.log("Email Info "+userEmail.uid);
      })
        console.log('user connected');
      this.router.navigate(['/home']);
      }

    })
    .catch(error => {
      

      this.toast("passwrd is wrong","danger");
      console.log('user NOT connected');


      

      
    })
  }




  // Toassssssst
  async toast(message,status){
    const toast = await this.toastr.create({
        message:message,
        position:'bottom',
        color:status,
        duration:3000,
        translucent:true,
        cssClass:'.button-color-changed '
    });
    toast.present();

}




}
