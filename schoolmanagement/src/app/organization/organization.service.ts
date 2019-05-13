import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Organization } from './organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private organizationCollection: AngularFirestoreCollection<Organization>;
  constructor(private af: AngularFirestore) {
    this.organizationCollection = af.collection<Organization>('Organizations');
  }
  async createOrganization(org: Organization) {
    return await this.organizationCollection.add(org);
  }
  getOrganizations() {
    // console.log(this.af.collection('Organizations').valueChanges());
    return this.af.collection('Organizations').valueChanges()
  }
}
