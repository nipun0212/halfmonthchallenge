import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { Organization } from '../organization';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {

  constructor(private orgS: OrganizationService) { }
  orgs: any;
  ngOnInit() {
    this.getOrganizations();
   }
  createOrganization() {
    const organization: Organization = {
      name: 'shivedale',
      contactNumber: '32323',
      email: 'annubajaj89@gmail.com',
      ownerName: 'Annu'
    };
    console.log(this.orgS.createOrganization(organization));
  }
  getOrganizations() {
    // this.orgS.getOrganizations().subscribe(x => {
    //   this.orgs = x;
    // })
    this.orgs = this.orgS.getOrganizations();
  }
}
