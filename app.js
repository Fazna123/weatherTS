var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//-----------------------------------------------------------------------------------------------------------------------
var WeatherService = /** @class */ (function () {
    function WeatherService(apiKey) {
        this.apiKey = apiKey;
    }
    WeatherService.prototype.getCurrentWeather = function (latitude, longitude) {
        return __awaiter(this, void 0, void 0, function () {
            var api, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = "https://api.weatherapi.com/v1/current.json?key=".concat(this.apiKey, "&q=").concat(latitude, ",").concat(longitude, "&aqi=no");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(api)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        console.log(data);
                        return [2 /*return*/, data];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error("Failed to fetch weather data: ".concat(error_1.message));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return WeatherService;
}());
//------------------------------------------------------------------------------------------------------------------------
var UIHandler = /** @class */ (function () {
    function UIHandler(degreeElement, degreeCelsius, locTimezone, tempData, tempIcon) {
        this.degreeElement = document.querySelector(degreeElement);
        this.locTimezone = document.querySelector(locTimezone);
        this.tempData = document.querySelector(tempData);
        this.tempIcon = document.querySelector(tempIcon); // Cast to HTMLImageElement
        this.degreeCelsius = document.querySelector(degreeCelsius);
    }
    UIHandler.prototype.updateUI = function (data) {
        var _a = data.current, temp_f = _a.temp_f, temp_c = _a.temp_c;
        var _b = data.current.condition, text = _b.text, icon = _b.icon;
        if (this.degreeElement !== null) {
            this.degreeElement.textContent = temp_f.toString();
        }
        if (this.locTimezone !== null) {
            this.locTimezone.textContent = data.location.tz_id;
        }
        if (this.tempData !== null) {
            console.log(text);
            this.tempData.textContent = text;
        }
        if (this.tempIcon !== null) {
            console.log(icon);
            this.tempIcon.src = "https:".concat(icon);
        }
        if (this.degreeCelsius !== null) {
            this.degreeCelsius.textContent = temp_c.toString();
        }
    };
    return UIHandler;
}());
//----------------------------------------------------------------------------------------------------
var WeatherApp = /** @class */ (function () {
    function WeatherApp(weatherService, uiHandler) {
        this.weatherService = weatherService;
        this.uiHandler = uiHandler;
    }
    WeatherApp.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, longitude, latitude, weatherData, error_2;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = position.coords, longitude = _a.longitude, latitude = _a.latitude;
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.weatherService.getCurrentWeather(latitude, longitude)];
                                case 2:
                                    weatherData = _b.sent();
                                    this.uiHandler.updateUI(weatherData);
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_2 = _b.sent();
                                    console.error(error_2.message);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); }, function (error) {
                        console.error("Error getting geolocation: ".concat(error.message));
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    return WeatherApp;
}());
//---------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    var apiKey = '889048381b9941d1907120529242601';
    var weatherService = new WeatherService(apiKey);
    var uiHandler = new UIHandler('.temp-degree', '.temp-degree-celsius', '.loc-timezone', '.temp-data', '.icon');
    var weatherApp = new WeatherApp(weatherService, uiHandler);
    weatherApp.run();
});
