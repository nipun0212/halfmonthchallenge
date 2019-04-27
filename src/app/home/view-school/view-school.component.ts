import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-view-school',
  templateUrl: './view-school.component.html',
  styleUrls: ['./view-school.component.scss'],
})
export class ViewSchoolComponent implements OnInit {

  orgId: string;
  organization: Observable<any>

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {
  }

  ngOnInit() {
    this.orgId = this.route.snapshot.paramMap.get('id');
    console.log(this.orgId)
    this.organization = this.db.doc("organizations/" + this.orgId).valueChanges()
    this.db.doc("organizations/1").get().subscribe(x => {
      console.log(x);
    })
  }

}
