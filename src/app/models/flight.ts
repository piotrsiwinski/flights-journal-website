/**
 * Created by Piotrek on 03.05.2017.
 */
export class Flight{
  number?: string;
  origin?: string;
  destination?: string;
  date?: Date;

  constructor(number: string, origin: string, destination: string, date: Date){
    this.number = number;
    this.origin = origin;
    this.destination = destination;
    this.date = date;
  }

}

