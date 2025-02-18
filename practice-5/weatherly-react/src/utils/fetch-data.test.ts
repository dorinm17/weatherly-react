// fetch-data.test.ts
import { getWeather, reverseGeocode, getCityCoordinates } from "./fetch-data";

// Mock fetch globally
global.fetch = jest.fn() as jest.Mock;

// Shared mocks
const mockCoordinates = {
  lat: 51.5074,
  lon: -0.1278,
  name: "London",
};

const mockWeatherResponses = [
  { cod: "200", list: [] }, // hourly
  { cod: "200", list: [] }, // daily
  { list: [] }, // air pollution
  { cod: 200 }, // current
];

describe("fetch-data.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getCityCoordinates", () => {
    test("returns coordinates for valid city", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve([mockCoordinates]),
      });

      const result = await getCityCoordinates("London");
      expect(result).toEqual(mockCoordinates);
    });

    test("returns null for invalid city", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      });

      const result = await getCityCoordinates("InvalidCity");
      expect(result).toBeNull();
    });
  });

  describe("reverseGeocode", () => {
    test("returns city name for valid coordinates", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            results: [
              {
                address_components: [
                  { types: ["locality"], long_name: "London" },
                ],
              },
            ],
          }),
      });

      const result = await reverseGeocode(51.5074, -0.1278);
      expect(result).toBe("London");
    });

    test("returns null for invalid coordinates", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve({ results: [] }),
      });

      const result = await reverseGeocode(0, 0);
      expect(result).toBeNull();
    });
  });

  describe("getWeather", () => {
    test("returns weather data for valid city", async () => {
      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          json: () => Promise.resolve([mockCoordinates]),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockWeatherResponses[0]),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockWeatherResponses[1]),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockWeatherResponses[2]),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockWeatherResponses[3]),
        });

      const result = await getWeather("London");
      expect(result).toEqual({
        hourlyForecast: mockWeatherResponses[0],
        dailyForecast: mockWeatherResponses[1],
        airPollution: mockWeatherResponses[2],
        currentWeather: mockWeatherResponses[3],
      });
    });

    test("throws error for invalid city", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(null),
      });

      await expect(getWeather("InvalidCity")).rejects.toThrow(
        "Failed to fetch weather data."
      );
    });

    test("returns weather data with fallback for missing air pollution", async () => {
      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          json: () => Promise.resolve([mockCoordinates]),
        }) // coordinates
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockWeatherResponses[0]),
        }) // hourly
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockWeatherResponses[1]),
        }) // daily
        .mockRejectedValueOnce(new Error("Air pollution API down")) // air pollution failure
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockWeatherResponses[3]),
        }); // current

      const result = await getWeather("London");

      expect(result).toEqual({
        hourlyForecast: mockWeatherResponses[0],
        dailyForecast: mockWeatherResponses[1],
        airPollution: "-", // Verify fallback value
        currentWeather: mockWeatherResponses[3],
      });
    });
  });
});
