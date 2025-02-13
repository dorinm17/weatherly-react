# Weatherly 🌦️

## Author: Dorin Manea 👨🏻‍💻

### Onboarding Practice @ GenStudio - AdobeDX

Ever checked the weather online and felt overwhelmed by outdated, clunky UIs? \
Say hello to **Weatherly**! Now checking the weather could not be any _simpler_ 💡, _more straight to the point_ 🚀 or _more beautiful_ 🖌️.

##### Tech Stack: React ⚛️, Jest, TypeScript, JavaScript, HTML, CSS

### 🔳 Practice 1

This milestone lays the foundation of the project, including:

- HTML skeleton: Well-structured and semantically meaningful;
- CSS styles 🎨: Designed for a polished, responsive layout;
- Resources 🖼️: images, icons.

While not yet interactive, this stage focuses on creating a _cross-device compatible_ template with media queries, ensuring it works beautifully on all screens 💻📱.

### 🔳 Practice 2

Using Vanilla JavaScript and asynchronous programming, I added _interactive features_ that bring functionality to the website 🎯.

When loaded, the app attempts to _geolocate_ 📍 the user and displays the weather for their current location. If geolocation fails—whether due to denied permissions or a Google Maps API error—the weather defaults to Bucharest.

The search bar lets users _look up the weather for any location_, as long as the data is available from the OpenWeatherMap API 🌦️. During network issues, a loading spinner keeps users informed, encouraging them to check their connection and try reconnecting 🔄 .

### 🔳 Practice 3

Leveled up ⬆️ the project by converting all JavaScript scripts to TypeScript, introducing benefits like _strong typing_, _interfaces_, and _decorators_. This transition ensures _better scalability_, _improved code clarity_, and _fewer runtime errors_ 🚫🐞 — perfect for serious project development.

### 🔳 Practice 4

Transitioned to a _component-based architecture_ 🧩 using React ⚛️, making the codebase more _modular_, _scalable_, and _easier to maintain_. Leveraged React hooks to manage state and side effects. This shift _improves performance_ and _enables faster development_ by reusing components across the app.

### 🔳 Practice 5

Implemented _unit testing_ using Jest to ensure individual components function correctly. It helps maintain a _high-quality_ codebase while making refactoring easier and safer.

### 🧪 Planned Features & Improvements
Currently, the search functionality is somewhat limited, as users can only search by city. I plan to enhance this by adding _autocomplete suggestions_ in the search bar, displaying the city, country, and, for the US, the state.

Another area for improvement is _performance_. Reverse geocoding could be optimized, and the overall rendering speed could be boosted for a smoother user experience.
