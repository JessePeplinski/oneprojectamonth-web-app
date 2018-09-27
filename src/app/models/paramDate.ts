export class paramDate {
    month: string;
    year: string;

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