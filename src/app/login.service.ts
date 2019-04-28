import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  claims: any;
  constructor(private afu: AngularFireAuth) {
    this.afu.idTokenResult.subscribe(x => {
      this.claims = x.claims;
      console.log("x")
      console.log(x.claims)
    })
  }
}
