import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private afu: AngularFireAuth) { }

  ngOnInit() { }

  async login() {
    await this.afu.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  async logout() {
    await this.afu.auth.signOut()
  }
}
