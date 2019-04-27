import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

import { HomePage } from './home.page';
import { AddSchoolComponent } from './add-school/add-school.component';
import { ViewSchoolComponent } from './view-school/view-school.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTableModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      {
        path: 'add',
        component: AddSchoolComponent
      },
      {
        path: ':id',
        component: ViewSchoolComponent
      }
    ])
  ],
  declarations: [HomePage, AddSchoolComponent, ViewSchoolComponent],
  exports: [AddSchoolComponent]

})
export class HomePageModule { }
