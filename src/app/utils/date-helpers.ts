/**
 * Created by Piotrek on 04.05.2017.
 */
export class DateHelper{
  public static convertToDate(date: Date): string{
    let year: string= date.getFullYear().toString();

    let month = (date.getMonth()+1).toString();
    if(date.getMonth()+1 < 10){
      month = '0' + (date.getMonth()+1).toString();
    }

    let day = (date.getDate()+1).toString();
    if(date.getDate()+1 < 10){
      day = '0' + (date.getDate()+1).toString();
    }

    let hour = date.getHours().toString();
    if(date.getHours() < 10){
      hour = '0' + date.getHours();
    }

    let minutes = date.getMinutes().toString();
    if(date.getMinutes() < 10){
      minutes = '0' + date.getMinutes();
    }

    let result: string = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
    return result;
  }

  public static convertDate(object: any) {
    for (let item of object) {
      item.date = new Date(item.date[0], item.date[1] - 1, item.date[2] - 1, item.date[3], item.date[4])
    }

    return object;
  }
}
