import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.page.html',
  styleUrls: ['./register-form.page.scss'],
})
export class RegisterFormPage implements OnInit {

  ConfirmPassword : string;
  passwordMatched:boolean;

  name:string;
  email:string;
  password:string;
  constructor(private toastCtr : ToastController,private loadingCtr : LoadingController,
    private authsrvc : AuthService,private router:Router) { }

  ngOnInit() {
  }




 async register(){

    if(this.name && this.email && this.password){
      const loading = await this.loadingCtr.create({
        message:'loading...',
        spinner:'crescent',
        showBackdrop:true
      });

      loading.present();


      this.authsrvc.RegisterUser(this.email,this.password, this.name)
      .then(register =>{
        loading.dismiss();
        this.authsrvc.SendVerificationMail();
        this.toast("enregistré avec success ","success");
            alert('you are registered');
            this.router.navigate(['/login']);
        
      }).catch(error =>{
        console.log(error.message)
        loading.dismiss();
        this.toast("une erreur est survenu lors de l'enregistrement","danger");
      });
     
    
    }else{
     
      this.toast('veuillez remplir le formulaire',"danger")
    }

    

  }

  checkPassword(){
    if(this.password === this.ConfirmPassword){
      this.passwordMatched =true
    }else{
      this.passwordMatched= false;
    }
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
}
