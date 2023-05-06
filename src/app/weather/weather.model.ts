export interface Position {
    coords: {
      latitude: number;
      longitude: number;
    };
}

export class CurrentWeather {
    constructor(
        public curDate: Date,
        public city: string,
        public curTemp: number, 
        public minTemp: number, 
        public maxTemp: number, 
    ) {
        this.curDate = curDate;
        this.city = city;
        this.curTemp = curTemp;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
    }
}

export class HoursWeather {
    constructor(
        public hour: string,
        public temp: string,
    ) {
        this.hour = hour;
        this.temp = temp;
    }
}