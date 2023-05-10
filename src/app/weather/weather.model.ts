export interface Position {
    coords: {
      latitude: number;
      longitude: number;
    };
}

export class CurrentWeather {
    constructor(
        public curDate: string,
        public curTime: string,
        public city: string,
        public curTemp: number, 
        public minTemp: number, 
        public maxTemp: number, 
        public weatherCode: {image: string, description: string, icon: string},
    ) {
        this.curDate = curDate;
        this.curTime = curTime;
        this.city = city;
        this.curTemp = curTemp;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
        this.weatherCode = weatherCode;
    }
}

export class HoursWeather {
    constructor(
        public hour: string,
        public temp: string,
        public precipitation: string,
        public weatherCode: {image: string, description: string, icon: string},
    ) {
        this.hour = hour;
        this.temp = temp;
        this.precipitation = precipitation;
        this.weatherCode = weatherCode;
    }
}

export class DaysWeather {
    constructor(
        public day: string,
        public precipitation: string,
        public minTemp: string,
        public maxTemp: string,
        public weatherCode: {image: string, description: string, icon: string},
    ) {
        this.day = day;
        this.precipitation = precipitation;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
        this.weatherCode = weatherCode;
    }
}