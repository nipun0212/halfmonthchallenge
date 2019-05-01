import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
// var sizeof = require('object-sizeof');

export interface Organization {
  name: string;
  mobileNumber?: string;
  active: boolean;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  organizations: Observable<Organization[]>
  constructor(private http: HttpClient, private db: AngularFirestore, public afAuth: AngularFireAuth, private fns: AngularFireFunctions) {
    this.organizations = this.db.collection("organizations").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Organization;
        const id = a.payload.doc.id;
        console.log({ id, ...data })
        return { id, ...data };
      })))

    // this.employees = db.collection('employees').doc('1').get().subscribe(x => console.log(x.data()))
    // this.employees = db.collection('employees').doc('1').onSnapshot().
    // this.employees = this.db.collection("employees").valueChanges(console.log())
    // this.employees = this.db.collection('employees').valueChanges()
    // this.employees = this.db.collection("employees").snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data()
    //     const id = a.payload.doc.id;
    //     console.log({ id, ...data });
    //     return { id, ...data };
    //   })))
  }

  // this.db.firestore.collection("employees").doc("1").
  //   this.employees =  x.data()
  // })
  // db.collection("employees").doc("1").ref
  //   .onSnapshot(function (doc) {
  //     console.log("Current data: ", doc.data());
  //     this.employees = doc.data()
  //   });
  // console.log(this.employees);
  async login() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    console.log("this.afAuth.idTokenResult")
    this.afAuth.idTokenResult.subscribe(x => {
      console.log(x)
      console.log("x.claims")
      console.log(x.claims)
      // console.log(sizeof(x.claims))
    })
    console.log("this.afAuth.idToken")
    console.log(await this.afAuth.idToken)
    console.log("this.afAuth.user")
    this.afAuth.user.subscribe(console.log)

  }
  logout() {
    this.afAuth.auth.signOut();
  }
  async registerOrg() {
    const organization = {
      name: 'shivedale',
      email: 'annubajaj89@gmail.com',
      phoneNumber: '8989898'
    };
    const docRef = await this.db.collection('Organizations').add(organization);
    console.log(docRef)
  }
  setCustomClaims() {
    const callable1 = this.fns.httpsCallable('registerOrganizationTest');
    callable1({
      organization: {
        name: 'shivedale',
        phoneNumber: '32323',
        organizationId: "1",
        email: 'nipunmadan19@gmail.com'

      }

    }).subscribe(r => {
      console.log("result")
      console.log(r)
    }, err => console.error("cdd")
    )
    this.db.collection("Organizations").doc("1").update({
      phoneNumber: "12345"
    }).then(x => {
      console.log(x)
      console.log("doc updated")
    }).catch(err => {
      console.log("eerr" + err)
    })
    this.http.get("http://localhost:5000/onemonthchallenge-fb0e8/us-central1/registerOrganizationTest").subscribe(x => {
      console.log("URL Called")
      console.log(x)
    })
    this.afAuth.auth.currentUser.getIdToken(true).then(x => {
      console.log("token refreshed")
      console.log(x)
    })
    this.afAuth.idTokenResult.subscribe(x => {
      console.log(x)
      console.log("x.claims")
      console.log(x.claims)
      // console.log(sizeof(x.claims))
    })
    const callable = this.fns.httpsCallable('setCustomClaims');
    callable({
      customClaims: {
        roles: {
          isOwner: true
        },
        organizationId: '1',
      },
      email: 'annubajaj89@gmail.com',

    }).subscribe(r => {
      console.log(r);
      console.log("this.afAuth.idTokenResult")
      this.afAuth.idTokenResult.subscribe(x => {
        console.log(x)
        console.log("x.claims")
        console.log(x.claims)
        // console.log(sizeof(x.claims))
      })
      console.log("this.afAuth.idToken")
      // console.log(await this.afAuth.idToken)
      console.log("this.afAuth.user")
      this.afAuth.user.subscribe(console.log)
      this.afAuth.auth.currentUser.getIdToken(true).then(x => {
        console.log("token refreshed")
        console.log(x)
      })
    })
  }
  registerOrganization() {
    const callable = this.fns.httpsCallable('registerOrganization');
    callable({
      organization: {
        name: 'shivedale',
        phoneNumber: '32323',
        organizationId: '1',
        email: 'annubajaj89@gmail.com'
      }
    }).subscribe(r => {
      console.log(r);
      console.log("this.afAuth.idTokenResult")
      this.afAuth.idTokenResult.subscribe(x => {
        console.log(x)
        console.log("x.claims")
        console.log(x.claims)
        // console.log(sizeof(x.claims))
      })
      console.log("this.afAuth.idToken")
      // console.log(await this.afAuth.idToken)
      console.log("this.afAuth.user")
      this.afAuth.user.subscribe(console.log)
      this.afAuth.auth.currentUser.getIdToken(true).then(x => {
        console.log("token refreshed")
        console.log(x)
      })
    })
  }

  getOrg(){
    this.db.collection("Organizations").get().subscribe(x=>{
      console.log(x.size)
    });
  }
}

