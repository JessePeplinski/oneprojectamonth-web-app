import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * This service reads the query parameters (hackathons/:month/:year) from the URL and saves them to an object
 */
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

  /**
   * Return to a specified page 
   */
  goToSpecifiedRoute(router, pageToNavigate) {
    // FIXME: Make the router actually go the right place based on the month you are on.
    // TODO
    router.navigate(['/hackathons', this.month, this.year, pageToNavigate]).then(nav => {
      console.log(`Routed to ${this.month}/${this.year}/${pageToNavigate}: ${nav}`); // true if navigation is successful
    }, err => {
      console.error(err) // when there's an error
    });
  }

}
