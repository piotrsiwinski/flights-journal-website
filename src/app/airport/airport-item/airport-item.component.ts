import {Component, OnInit, OnDestroy} from '@angular/core';
import {AirportService} from "../airport.service";
import {AirportViewModel} from "../../models/airport-view-model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Rx"

@Component({
  selector: 'app-airport-item',
  templateUrl: './airport-item.component.html',
  styleUrls: ['./airport-item.component.css']
})
export class AirportItemComponent implements OnInit, OnDestroy {

  private airportName: string;
  private subscription: Subscription;
  selectedAirport: AirportViewModel;

  constructor(
    private airportService: AirportService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.airportService.selectAirport.subscribe(airport => this.selectedAirport = airport);
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => this.airportName = param['name']
    );



    this.airportService.getAirports(this.airportName).subscribe(data => this.selectedAirport = data[0]);
  }

  onClick(){
    this.router.navigate(['/airport'])
  }


  onHideButtonClick(){
    this.selectedAirport = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
