import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamDateService {

  month: string;
  year: string;

  constructor() { }

  getMonthAndYearParamsFromURL(route) {
      route.paramMap.subscribe(params => {
          // get the parms from the url
          const month = params.get('month');
          const year = params.get('year');

          // set the params to an object
          this.month = month;
          this.year = year;
      });
  }
}
