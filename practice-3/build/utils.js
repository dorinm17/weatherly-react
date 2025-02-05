var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Decorator to check if the `number` type arguments for most of the methods are positive.
const isPositive = (paramIndexes) => {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const indexesToCheck = paramIndexes ?? args.map((_, index) => index);
            indexesToCheck.forEach((index) => {
                if (typeof args[index] === "number" && args[index] < 0) {
                    throw new Error(`Argument at index ${index} in ${String(propertyKey)} must be a non-negative number.`);
                }
            });
            return originalMethod.apply(this, args);
        };
    };
};
class Utils {
    static capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
    static dayOrNight(sunrise, sunset) {
        const now = new Date().getTime() / 1000;
        return now >= sunrise && now < sunset;
    }
    // Display an accurate weather icon.
    static chooseImage(code, daytime) {
        let image = "";
        if (code >= 200 && code < 300)
            image = "thunderstorm";
        else if (code >= 300 && code < 600)
            image = "rain";
        else if (code >= 600 && code <= 613)
            image = "snow";
        else if (code >= 615 && code < 700)
            image = "rain-and-snow";
        else if ([701, 721, 741, 771].includes(code))
            image = "wind";
        else if (code === 781)
            image = "tornado";
        else if (code >= 700 && code < 800)
            image = "smoke";
        else if (code === 800)
            image = daytime ? "sun" : "moon";
        else if ([801, 802].includes(code))
            image = daytime ? "sun-and-clouds" : "moon-and-clouds";
        else if ([803, 804].includes(code))
            image = "clouds";
        const imageTag = document.createElement("img");
        try {
            imageTag.src = `images/${image}.svg`;
        }
        catch (error) {
            console.error("Image not found");
        }
        imageTag.alt = "";
        return imageTag;
    }
    static convertMpsToKmph(mps) {
        return (mps * 3.6).toFixed(0);
    }
    // Convert the Air Quality Index to a more verbose description.
    static descArr = [
        "Good",
        "Fair",
        "Moderate",
        "Poor",
        "Very Poor",
    ];
    static convertAQI(aqi) {
        return Utils.descArr[aqi - 1];
    }
    static convertToLocalTime(time, timezone) {
        return new Date((time + timezone) * 1000).toLocaleTimeString("en-US", {
            timeZone: "UTC",
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
        });
    }
    // Check if the temperature is zero and return 0 instead of -0.
    static checkIfZeroTemp(temp) {
        const roundedTemp = temp.toFixed(0);
        return roundedTemp === "-0" ? "0" : roundedTemp;
    }
}
__decorate([
    isPositive(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], Utils, "dayOrNight", null);
__decorate([
    isPositive(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", HTMLImageElement)
], Utils, "chooseImage", null);
__decorate([
    isPositive(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", String)
], Utils, "convertMpsToKmph", null);
__decorate([
    isPositive([0]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", String)
], Utils, "convertToLocalTime", null);
export const capitalize = Utils.capitalize;
export const dayOrNight = Utils.dayOrNight;
export const chooseImage = Utils.chooseImage;
export const convertMpsToKmph = Utils.convertMpsToKmph;
export const convertAQI = Utils.convertAQI;
export const convertToLocalTime = Utils.convertToLocalTime;
export const checkIfZeroTemp = Utils.checkIfZeroTemp;
