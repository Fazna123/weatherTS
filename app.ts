
interface Position{
    coords:{
        latitude:number;
        longitude:number;
    }
}
interface WeatherApiResponse {
    current: {
        temp_f: number;
        temp_c:number;
        condition: {
            text: string;
            icon: string;
        };
    };
    location: {
        tz_id: string;
    };
}

//-----------------------------------------------------------------------------------------------------------------------


class WeatherService {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async getCurrentWeather(latitude: number, longitude: number): Promise<WeatherApiResponse> {
        const api = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${latitude},${longitude}&aqi=no`;

        try {
            const response = await fetch(api);
            
            const data: WeatherApiResponse = await response.json();
            console.log(data)
            return data;
        } catch (error:any) {
            throw new Error(`Failed to fetch weather data: ${error.message}`);
        }
    }
}


//-----------------------------------------------------------------------------------------------------------------------------

class UIHandler {
    private degreeElement: HTMLElement | null;
    private degreeCelsius : HTMLElement | null;
    private locTimezone: HTMLElement | null;
    private tempData: HTMLElement | null;
    private tempIcon: HTMLImageElement; // Updated to HTMLImageElement

    constructor(degreeElement: string, degreeCelsius: string, locTimezone: string, tempData: string, tempIcon: string) {
        this.degreeElement = document.querySelector(degreeElement);
        this.locTimezone = document.querySelector(locTimezone);
        this.tempData = document.querySelector(tempData);
        this.tempIcon = document.querySelector(tempIcon) as HTMLImageElement; // Cast to HTMLImageElement
        this.degreeCelsius = document.querySelector(degreeCelsius)
    }

    updateUI(data: WeatherApiResponse): void {
        const { temp_f,temp_c } = data.current;
        const { text, icon } = data.current.condition;
        
        
        if (this.degreeElement !== null) {
            this.degreeElement.textContent = temp_f.toString();
        }
        if (this.locTimezone !== null) {
            this.locTimezone.textContent = data.location.tz_id;
        }
        if (this.tempData !== null) {
           console.log(text)
            this.tempData.textContent = text;
         }
        if (this.tempIcon !== null) {   
            console.log(icon)        
            this.tempIcon.src = `https:${icon}`;
        }
        if(this.degreeCelsius !== null){
            this.degreeCelsius.textContent = temp_c.toString();
        }
        
    }
}


//---------------------------------------------------------------------------------------------------------------------------------


class WeatherApp {
    private weatherService: WeatherService;
    private uiHandler: UIHandler;

    constructor(weatherService: WeatherService, uiHandler: UIHandler) {
        this.weatherService = weatherService;
        this.uiHandler = uiHandler;
    }

    async run(): Promise<void> {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position: GeolocationPosition) => {
                    const { longitude, latitude } = position.coords;

                    try {
                        const weatherData = await this.weatherService.getCurrentWeather(latitude, longitude);
                        this.uiHandler.updateUI(weatherData);
                    } catch (error:any) {
                        console.error(error.message);
                    }
                },
                (error) => {
                    console.error(`Error getting geolocation: ${error.message}`);
                }
            );
        }
    }
}



//-----------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '889048381b9941d1907120529242601';
    const weatherService = new WeatherService(apiKey);
    const uiHandler = new UIHandler('.temp-degree', '.temp-degree-celsius', '.loc-timezone', '.temp-data', '.icon');
    const weatherApp = new WeatherApp(weatherService, uiHandler);

    weatherApp.run();
});
