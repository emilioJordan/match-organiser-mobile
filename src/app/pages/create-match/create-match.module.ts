import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateMatchPageRoutingModule } from './create-match-routing.module';
import { CreateMatchPage } from './create-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateMatchPageRoutingModule
  ],
  declarations: [CreateMatchPage]
})
export class CreateMatchPageModule {}
