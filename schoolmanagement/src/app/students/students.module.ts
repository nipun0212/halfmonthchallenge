import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { StudentsComponent } from './students/students.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: StudentsComponent,
      }
    ])
  ],
  declarations: [StudentsComponent],
  providers: [AuthService]

})
export class StudentsModule { }
