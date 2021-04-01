import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { QuestionComponent } from './question/question.component';


@NgModule({
  declarations: [ProfileComponent, ProfileHeaderComponent, QuestionComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
