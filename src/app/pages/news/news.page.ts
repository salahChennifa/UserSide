import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectsService } from 'src/app/services/objects.service';
import { AuthService } from 'src/app/services/auth.service';
import { News } from 'src/app/models/news';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  id:string;
  lists : News [];
  changed : boolean=false;
  listNew : News = {
    title:"",
    date:"",
    body:"",
    id:"",
    image:"",
    likeNew:0
  }
  constructor(private router: ActivatedRoute,private authSrvc : AuthService,private afs: AngularFirestore) { }

  ngOnInit() {
    this.id = this.router.snapshot.params['id'];

    console.log("id",this.id);
    this.authSrvc.getOneActualité(this.id).subscribe( (res) => {

       this.listNew = res;
        
      console.log('news ...', this.listNew);
       

    });
     
      


  }

  updateLike(){

    console.log("id", this.id);
    this.afs.collection('actualités').doc(this.id).update({
      likeNew : this.listNew.likeNew +1
    })
    this.changed = true;
    console.log('changed',(this.listNew.likeNew));
  }
  
  }


