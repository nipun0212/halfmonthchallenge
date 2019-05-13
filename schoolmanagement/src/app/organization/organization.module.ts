import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization/organization.component';
import { CreateOrganizationComponent } from './create-organization/create-organization.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrganizationComponent,
      },
      {
        path: 'addOrganization',
        component: CreateOrganizationComponent,
        children: [{
          path: '**',
          component: CreateOrganizationComponent,
        }]
      }
    ])
  ],
  declarations: [OrganizationComponent, CreateOrganizationComponent],
})
export class OrganizationModule { }
