import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { InboxHeaderComponent } from './inbox-header/inbox-header.component';
import { QuestionComponent } from './question/question.component';


@NgModule({
  declarations: [InboxComponent, InboxHeaderComponent, QuestionComponent],
  imports: [
    CommonModule,
    InboxRoutingModule
  ]
})
export class InboxModule { }
