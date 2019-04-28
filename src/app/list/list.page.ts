import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  constructor(private db: AngularFirestore, private afa: AngularFireAuth, private ls: LoginService) {
  }

  ngOnInit() {
  }

  async getClaims() {
    return await this.afa.idTokenResult.subscribe(claims => {
      return claims;
    })
  }
  async getUsers() {
    // await this.afa.idToken.subscribe(x => {
    //   console.log(x)
    // })
    // await this.afa.user.subscribe(x => {
    //   console.log(x)
    // })
    // const claims = this.afa.idTokenResult.subscribe(claims => {
    //   return claims;
    // })
    console.log("this.ls.claims")
    console.log(this.ls.claims)
    console.log(this.ls.claims.organizationId)
    console.log(this.db.collection('Organizations').doc(this.ls.claims.organizationId).get().subscribe(x => {
      console.log(x)
      console.log(x.data())
    }))
  }
}
