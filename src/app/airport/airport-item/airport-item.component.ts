import {Component, OnDestroy, OnInit} from '@angular/core';
import {AirportService} from '../airport.service';
import {AirportViewModel} from '../../models/airport-view-model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {GoogleMapsModel} from '../../models/google-maps-model';

@Component({
  selector: 'app-airport-item',
  templateUrl: './airport-item.component.html',
  styleUrls: ['./airport-item.component.css']
})
export class AirportItemComponent implements OnInit, OnDestroy {

  private airportName: string;
  public subscription: Subscription;
  public selectedAirport: AirportViewModel;
  public googleMapsModel: GoogleMapsModel = {lat: 0, lng: 0, zoom: 3, markers: []};
  private showMap: boolean = false;

  constructor(private airportService: AirportService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.airportService.selectAirport.subscribe(airport => this.selectedAirport = airport);
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => this.airportName = param['name']
    );

    this.airportService.getAirports(this.airportName).subscribe(this.onInitSuccess);

  }

  private onInitSuccess = (data) => {
    this.selectedAirport = data[0];
    console.log(`Airport details: ${this.selectedAirport}`);
    this.googleMapsModel.markers = [];
    this.googleMapsModel.markers.push({
      label: this.selectedAirport.name,
      lat: this.selectedAirport.latitude,
      lng: this.selectedAirport.longitude
    });
  }

  onShowClick() {
    this.showMap = true;
    console.log('Click works');
  }

  onClick() {
    this.router.navigate(['/airport']);
  }


  onHideButtonClick() {
    this.selectedAirport = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
