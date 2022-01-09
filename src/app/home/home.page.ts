import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { News } from '../models/news';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { ObjectsService } from '../services/objects.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  infoUser : any;
  UserIsLogged :string;
  isLogged :boolean=false;
  id: string;
  uid : string;
  getValue : string
  lists : News[] = []

  listNew : News = {
    title:"",
    date:"",
    body:"",
    id:"",
    image:""
  }
  user : User ={
    
    userId:"",
    name:"",
    email:"",
    createAt:null,
    BirthDate:null,
    Phone:null,
    niveauUser:1,
    nbrPoints:25,
    qcmState:1,
    imageUrl:"",
    accepted:false
  };
  constructor(private objServices : ObjectsService, private router : Router,
    private AuthSrvc : AuthService,private route: ActivatedRoute) {
     
    }

  slidesOptions = {
    slidesPerView: 1.5
  }


  getQuiz(){
    let t: any
    console.log('user id is . ', this.user.niveauUser)
    this.objServices.getAllQuiz()
    .subscribe((x:any) => {
      console.log('x . inside get quiz ', x)
      //t = x[0].niveau[this.user.niveauUser]
      //.qcm[this.user.qcmState]
      console.log('all all : ', x[0].niveau[this.user.niveauUser])
       t =x[0].niveau[this.user.niveauUser]
      
      let navigationExtra : NavigationExtras = {
        state: {
          user: t,
          nbrPointTotal: this.user.nbrPoints,
          uid : this.user.userId,
          niveauUser: this.user.niveauUser ,
          qcmState: this.user.qcmState
        }
      }
      this.router.navigate(['/form-quiz'],navigationExtra )
    })
    
      
  }

  ngOnInit(){
  this.route.queryParams
  .subscribe(parmas => {
    if (this.router.getCurrentNavigation().extras.state){
      this.infoUser = this.router.getCurrentNavigation().extras.state.user;
      console.log("info uxtra user : ", this.infoUser)
      this.user.userId = this.infoUser.userId;
      this.user.qcmState = this.infoUser.qcmState;
      this.user.name = this.infoUser.name;
      this.user.niveauUser = this.infoUser.niveauUser;
      this.user.nbrPoints = this.infoUser.nbrPoints;
      this.user.imageUrl = this.infoUser.imageUrl;
      console.log("nbr points : ", this.user.nbrPoints)
      this.user.email = this.infoUser.email;
    }
  })
  
  this.AuthSrvc.getAuth().subscribe(auth => {

  
    this.objServices.listOfActualités().subscribe(list =>  {
      
      this.lists = list;
      
     this.lists.forEach((list) => {
       console.log('user',)
      this.listNew.id = list.id;
      this.listNew.title = list.title;
      this.listNew.body = list.body;
      this.listNew.date = list.date;


     
  
     })
      
     console.log(this.lists);
   })
  })
  

  }


  goItem(id:string){
    console.log(id);
  }

}
