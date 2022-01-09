import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-form-quiz',
  templateUrl: './form-quiz.page.html',
  styleUrls: ['./form-quiz.page.scss'],
})
export class FormQuizPage implements OnInit {
  index = 0
  value = false
  isAanserd = false
  isclick :boolean=true
  niveauUser = 1
  answer = -1
  QuizData : any;
  sumPoint : number= 0;
  sumPointForEachQcm : number = 0;
  stateQcm : number = 0

  // user
  user : User ={
    
    userId:"",
    name:"",
    email:"",
    createAt:null,
    BirthDate:null,
    Phone:null,
    niveauUser:1,
    nbrPoints:25,
    qcmState:null,
    accepted:false,
    imageUrl:""
  };
 
question = ""
options : any


  constructor(private objServices : ObjectsService,private router: ActivatedRoute,private route : Router,private afs : AngularFirestore) { 
    // console.log("inex is : ", this.index)
    // console.log("nbr of point is : ", this.sumPoint)
    console.log("inside form-quiz")
  }
  back(){
    //
    console.log("niveau : is ", this.QuizData.niveauUser)
    console.log("lengh is : ", )
    console.log("Nbr points : ", this.sumPoint)
    console.log("state Qcm",this.stateQcm)
    this.updateNiveauQuiz("B")
    if (this.index == this.QuizData.user.length){
      this.updateNiveauQuiz("A")
    }
    // let navigationExtra : NavigationExtras = {
    //   state: {
      
    //     nbrPointTotal: this.user.nbrPoints,
    //     // uid : this.user.userId,
    //     niveauUser: this.user.niveauUser ,
    //     qcmState: this.user.qcmState
    //   }
    // }
    // this.route.navigate(['/home'],navigationExtra)
  }

  getIndexQuiz(){
    //this.stateQcm = this.index
    return this.index
  }

  ngOnInit() {

    this.router.queryParams
    .subscribe(parmas => {
    if (this.route.getCurrentNavigation().extras.state){
      this.QuizData = this.route.getCurrentNavigation().extras.state;
      console.log("INFO: ",this.QuizData)
    
      this.sumPoint = this.QuizData.nbrPointTotal;
      this.index = this.stateQcm = this.QuizData.qcmState;
      console.log("Loading again index is : ", this.index);
      console.log("Loading again state of qcm is : ", this.stateQcm);
    }
    })
  }

  click(i){
    this.isAanserd = true
    console.log("i : ", i)
    if (i == this.QuizData.user[this.getIndexQuiz()].answer){
      if ( this.index ==  this.QuizData.user.length ){
        console.log("inide 100")
        return
      }

      this.sumPoint = this.sumPoint +  this.QuizData.user[this.getIndexQuiz()].point;
      this.sumPointForEachQcm = this.sumPointForEachQcm + this.QuizData.user[this.getIndexQuiz()].point;
      if (this.sumPointForEachQcm == 100){
        console.log("number of point is 100")
        this.updateNiveauQuiz("A")
      }
      // else{
      //   this.updateNiveauQuiz("B")
      // }
      console.log("index befor : ", this.index)
      this.index ++
      console.log("index after : ", this.index)
      console.log("the array lengt is ", this.QuizData.user.length)
      
      console.log("correct anser sum is : ", this.sumPoint)
      
      if ( this.index <  this.QuizData.user.length ){
        this.isAanserd = false
      }
      this.stateQcm = this.index
      this.value = true
    }
    else
      this.value = false
    
      //console.log("incorrect")
  }

  reset(){
    this.value = false
    this.isAanserd = false
    this.index = this.stateQcm
  }


  //getQuiz from firestore ... 

  getQuiz(){

    // this.router.navigate(['/form-quiz'])
    this.objServices.getAllQuiz().subscribe(quiz => {
      console.log(quiz);
    })
  }

  updateNiveauQuiz(a: string){
    console.log("id",this.QuizData.uid)
    console.log("user lavel : ", this.QuizData.user.niveauUser)
    if (a == "A"){
      this.afs.collection('users').doc(this.QuizData.uid).update({
        'nbrPoints':this.sumPoint,
        'niveauUser':this.QuizData.niveauUser + 1,
        'qcmState': 0,
      });
    }
    if(a == "B"){
      this.afs.collection('users').doc(this.QuizData.uid).update({
        'nbrPoints':this.sumPoint,
        'niveauUser':this.QuizData.niveauUser,
        'qcmState': this.stateQcm,
      });
    }
    
  }


  // getTotal(){
  //   return this.clients.reduce((total, client) => {
  //      return total + parseFloat(client.balance.toString());
  //    },0)
  //  }


}
