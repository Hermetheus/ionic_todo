import { MapModalComponent } from './../../../shared/map-modal/map-modal.component';
import { AuthService } from './../../../auth/auth.service';
import { BookingService } from './../../../bookings/booking.service';
import { Subscription } from 'rxjs';
import { CreateBookingComponent } from './../../../bookings/create-booking/create-booking.component';
import { Place } from './../../place.module';
import { PlacesService } from './../../../places.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController,
  AlertController,
} from '@ionic/angular';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  isBookable = false;
  isLoading = false;
  private placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alrtController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.isLoading = true;
      this.placeSub = this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe(
          (place) => {
            this.place = place;
            this.isBookable = place.userId !== this.authService.userId;
            this.isLoading = false;
          },
          (error) => {
            this.alrtController
              .create({
                header: 'An error occurred!',
                message: 'Could not load place!',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/places/tabs/discover']);
                    },
                  },
                ],
              })
              .then((alertEl) => alertEl.present());
          }
        );
    });
  }

  onBookPlace() {
    // this.router.navigateByUrl('/places/tabs/discover');
    // this.navCtrl.navigateBack('/places/tabs/discover');
    // this.navCtrl.pop();
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            },
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }
  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: {
          selectedPlace: this.place,
          selectedMode: mode,
        },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        this.loadingCtrl
          .create({
            message: 'Booking place...',
          })
          .then((loadingEl) => {
            loadingEl.present();
            const data = resultData.data.bookingData;
            this.bookingService
              .addBooking(
                this.place.id,
                this.place.title,
                this.place.imageUrl,
                data.firstName,
                data.lastName,
                data.guestNumber,
                data.startDate,
                data.endDate
              )
              .subscribe(() => {
                loadingEl.dismiss();
              });
          });
      });
  }

  onShowFullMap() {
    this.modalCtrl
      .create({
        component: MapModalComponent,
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }
  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
