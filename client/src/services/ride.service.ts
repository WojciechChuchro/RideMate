import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'
import {Ride} from '../types/ride'
import {HttpClient} from '@angular/common/http'
import {Rides, RidesResponse} from '../types/response'
import {map} from 'rxjs/operators'
import {MessageResponseOnly} from '../types/user'
import {environment} from '../environments/environment'

// todo ogarnac typy
export interface UserRides2 {
  id: number;
  userId: number;
  lookingForDriverId: number;
  rideId: number;
  StatusId: number;
  driverId: number;
  startAddressId: number;
  destinationAddressId: number;
  earliestDepartureTime: string;
  latestDepartureTime: string;
  pricePerPerson: number;
  seatsNumber: number;
  registrationNumber: string;
  user: Users;
  ride: Rides2;
  lookingForDriver: LookingForDrivers;
  status: Statuses;
}

export interface Rides2 {
  id: number;
  driverId: number;
  startAddressId: number;
  destinationAddressId: number;
  earliestDepartureTime: string;
  latestDepartureTime: string;
  pricePerPerson: number;
  seatsNumber: number;
  registrationNumber: string;
  // These fields are not in the original data but are calculated later
  earliestDepartureDate?: string;
  latestDepartureDate?: string;
  duration?: string;
}

export interface Users {
  id: number;
  modelId: number;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  profilePicture: any; // Change 'any' to appropriate type
  password: string;
  salt: string;
  sessionToken: string;
}

export interface LookingForDrivers {
  id: number;
  startAddressId: number;
  destinationAddressId: number;
  earliestDepartureTime: string;
  latestDepartureTime: string;
  maxPrice: number;
  numberOfPeople: number;
}

export interface Statuses {
  id: number;
  isAccepted: number;
}

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private apiBaseUrl: string
  private rideSource = new BehaviorSubject<Ride | undefined>(undefined)
  currentRide = this.rideSource.asObservable()

  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl
  }

  formatDate(dateTime: string): string {
    const datePart = dateTime.split(' ')[0] // Get the date part
    const date = new Date(datePart)
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
    return date.toLocaleDateString('en-GB', options)
  }

  formatTime(dateTime: string): string {
    const timePart = dateTime.split(' ')[1] // Get the time part
    return timePart.slice(0, 5) // Remove seconds
  }

  calculateDuration(startTime: string, endTime: string): string {
    const start = new Date(startTime)
    const end = new Date(endTime)
    const difference = end.getTime() - start.getTime()
    const totalMinutes = Math.round(difference / (1000 * 60))
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    let durationStr = ''
    if (hours > 0) {
      durationStr += `${hours} ${hours > 1 ? 'hours' : 'hour'}`
    }

    if (minutes > 0) {
      if (durationStr) {
        durationStr += ' '
      }
      durationStr += `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`
    }

    return durationStr
  }

  changeRide(ride: Ride | undefined): void {
    this.rideSource.next(ride)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reserveRide(rideId: number): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/accept-ride`, {rideId}, {withCredentials: true}) // Assuming your API only needs the rideId.
  }

  fetchRides(): Observable<Rides[]> {
    return this.http
      .get<RidesResponse>(`${this.apiBaseUrl}/get-rides`, {
        withCredentials: true,
      })
      .pipe(
        map((response: RidesResponse) => {
          return response.rides.map((ride: Rides) => {
            ride.earliestDepartureDate = this.formatDate(
              ride.earliestDepartureTime,
            )
            ride.latestDepartureDate = this.formatDate(ride.latestDepartureTime)
            ride.earliestDepartureTime = this.formatTime(
              ride.earliestDepartureTime,
            )
            ride.latestDepartureTime = this.formatTime(ride.latestDepartureTime)
            ride.duration = this.calculateDuration(
              ride.earliestDepartureDate + ' ' + ride.earliestDepartureTime,
              ride.latestDepartureDate + ' ' + ride.latestDepartureTime,
            )
            return ride
          })
        }),
      )
  }

  fetchRidesAsPassenger(): Observable<UserRides2[]> {
    return this.http
      .get<UserRides2[]>(`${this.apiBaseUrl}/get-rides-as-passenger`, {
        withCredentials: true,
      })
      .pipe(
        map((response: any) => {
          console.log('res:', response, typeof response)

          return response.userRides.map((userRide: UserRides2) => {
            console.log('ride: ', userRide)
            userRide.ride.earliestDepartureDate = this.formatDate(
              userRide.ride.earliestDepartureTime
            )
            userRide.ride.latestDepartureDate = this.formatDate(
              userRide.ride.latestDepartureTime
            )
            userRide.ride.earliestDepartureTime = this.formatTime(
              userRide.ride.earliestDepartureTime
            )
            userRide.ride.latestDepartureTime = this.formatTime(
              userRide.ride.latestDepartureTime
            )
            userRide.ride.duration = this.calculateDuration(
              userRide.ride.earliestDepartureDate + ' ' + userRide.ride.earliestDepartureTime,
              userRide.ride.latestDepartureDate + ' ' + userRide.ride.latestDepartureTime
            )
            return userRide
          })
        })
      )
  }

  deleteUser(statusId: number): Observable<MessageResponseOnly> {
    return this.http.post<MessageResponseOnly>(`${this.apiBaseUrl}/delete`, {statusId}, {
      withCredentials: true,
    })
  }

  acceptUser(statusId: number): Observable<MessageResponseOnly> {
    return this.http.post<MessageResponseOnly>(`${this.apiBaseUrl}/accept`, {statusId}, {
      withCredentials: true,
    })
  }


}
