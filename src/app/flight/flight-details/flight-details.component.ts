import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AirportService} from "../../airport/airport.service";


interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit, OnChanges {
  // google maps zoom level
  zoom: number = 5;

  // initial center position for the map
  lat: number = 51.469603;
  lng: number = 6.00;

  markers: marker[] = [];

  @Input() flight;

  constructor(private airportService: AirportService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.flight) {
      return;
    }
    //get and display on map dst and origin airports
    this.airportService.getAirports(this.flight.destination.name).subscribe(data => {
      this.markers = [];
      let airport: any = data[0];

      this.markers.push({
        label: airport.name,
        lat: airport.latitude | 51.469603,
        lng: airport.longitude | -0.453566
      });

      this.airportService.getAirports(this.flight.origin.name).subscribe(data => {
        let airport: any = data[0];

        this.markers.push({
          label: airport.name,
          lat: airport.latitude | 54.339722,
          lng: airport.longitude | 12.711667
        });
      })
    })
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }



}
