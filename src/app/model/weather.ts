export class Weather {
    constructor(
        public temp: number,
        public summary: string,
        public wind: number,
        public humidity: number,
        public icon: string,
        public city: string,
        public lat: number,
        public long: number
    ) { }
}