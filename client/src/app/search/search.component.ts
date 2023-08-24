import {ChangeDetectorRef, Component, OnInit} from '@angular/core'
import {SearchService} from '../../services/search.service'
import {Router} from '@angular/router'
import {RideService} from '../../services/ride.service'
import {RidesResponse} from '../../types/response'
import {Ride} from '../../types/ride'




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  rides: Ride[] = []
  userIds: number[] = []
  // searchTerm: string = 'eao';
  loading: boolean = false

  constructor(
		private router: Router,
		private search: SearchService,
		private cdRef: ChangeDetectorRef,
	private rideSharingService: RideService
  ) {
  }

  ngOnInit(): void {
    this.loading = true
    this.fetchRides()

  }

  onRideClick(rideId: number): void {
    const ride: Ride | undefined = this.rides.find(r => r.id === rideId)
    if (!ride) {
      return
    }
    this.rideSharingService.changeRide(ride)
    this.router.navigate(['/ride-detail', ride.id])
  }


  formatDate(inputDate: string): string {
    const date = new Date(inputDate)
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }

    return date.toLocaleDateString('en-GB', options)
  }

  fetchRides():void {
    this.search.getAllRides().subscribe({
      next: (response: RidesResponse) => {
        this.rides = response.rides.map((ride: Ride) => {
          // Format the date strings in each ride object
          ride.earliestDepartureTime = this.formatDate(ride.earliestDepartureTime)
          ride.latestDepartureTime = this.formatDate(ride.latestDepartureTime)
          return ride
        })
      },
      error: (error) => {
        this.loading = false
        console.error('Error fetching rides:', error)
      }
    })
  }

  fetchUsers(): void {
    this.search.getUsers(this.userIds).subscribe({
      next: (userResponse) => {
        // Handle the user response here
        this.loading = false
        console.log('Users response:', userResponse)
      },
      error: (error) => {
        this.loading = false
        console.error('Error fetching users:', error)
      }
    })
  }


  // handleSearch() {
  //
  // }
}
