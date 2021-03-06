import { SharedModule } from './../../../shared/shared.module';
import { CreateBookingComponent } from './../../../bookings/create-booking/create-booking.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceDetailPageRoutingModule } from './place-detail-routing.module';

import { PlaceDetailPage } from './place-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PlaceDetailPageRoutingModule,
  ],
  entryComponents: [CreateBookingComponent],
  declarations: [PlaceDetailPage, CreateBookingComponent],
})
export class PlaceDetailPageModule {}
