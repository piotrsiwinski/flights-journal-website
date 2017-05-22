import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AirportService} from "../../airport/airport.service";
import {FlightService} from "../flight.service";
import {GoogleMapsModel} from "../../models/google-maps-model";

//
// interface marker {
//   lat: number;
//   lng: number;
//   label?: string;
//   draggable?: boolean;
// }

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit, OnChanges {
  private googleMapsModel: GoogleMapsModel = {lat: 0, lng: 0, zoom: 3, markers: []};
  @Input() flight;

  constructor(private flightService: FlightService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.flightService.getFlightById(this.flight.id).subscribe(this.handleFlightData, this.handleError);
  }

  private handleFlightData = data => {
    this.googleMapsModel.markers = [];
    this.googleMapsModel.markers.push({
      label: data.destination.name,
      lat: data.destination.latitude,
      lng: data.destination.longitude
    });
    this.googleMapsModel.markers.push({
      label: data.origin.name,
      lat: data.origin.latitude,
      lng: data.origin.longitude
    });
    this.googleMapsModel.lat = (data.destination.latitude + data.origin.latitude) / 2;
    this.googleMapsModel.lng = (data.destination.longitude + data.origin.longitude) / 2;
  }

  private handleError = err => {
    console.log(JSON.stringify(err, null, 2));
  }


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event) {
    // this.googleMapsModel.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng
    // });
  }

  markerDragEnd(m, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
}
