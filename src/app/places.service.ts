import { AuthService } from './auth/auth.service';
import { Place } from './places/place.module';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    // tslint:disable-next-line: max-line-length
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://image.shutterstock.com/image-illustration/expensive-private-villa-swimming-pool-260nw-1070624348.jpg',
      149.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    // tslint:disable-next-line: max-line-length
    new Place(
      'p2',
      'Trailor',
      'Some place',
      'https://storage.bhs.cloud.ovh.net/v1/AUTH_e7d15450bedd40b9b599e075527df3cb/loz/fOLDER_MOBILE_HOME__Trailer_House__1500_S_5b344eac05591.jpg',
      49.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    // tslint:disable-next-line: max-line-length
    new Place(
      'p3',
      'Foggy Palace',
      'Not your average trip!',
      'https://cdnb.artstation.com/p/assets/images/images/018/412/489/4k/fernando-fleury-project-concept-v7.jpg?1559265146',
      99.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    )
  ];

  get places() {
    return [...this._places];
  }

  constructor(private authService: AuthService) {}

  getPlace(id: string) {
    return { ...this._places.find(p => p.id === id) };
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://cdnb.artstation.com/p/assets/images/images/018/412/489/4k/fernando-fleury-project-concept-v7.jpg?1559265146',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    this._places.push(newPlace);
  }
}
