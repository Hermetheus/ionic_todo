import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsPageRoutingModule } from './bookings-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BookingsPageRoutingModule]
})
export class BookingsPageModule {}
