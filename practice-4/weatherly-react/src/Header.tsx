function Header() {
  return (
    <header>
      <div>
        <h1>Weatherly</h1>
        <h2>
          Don't be under the weather<span id="exclamation-mark">!</span>
        </h2>
      </div>

      <img id="banner" src="src/assets/weather-transition.jpeg" alt="" />

      <nav>
        <form action="" method="get" autoComplete="off">
          <button type="submit" aria-label="Submit your search">
            <img src="src/assets/search.svg" alt="search" />
          </button>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Search for your city"
            aria-label="Search for your city"
          />
        </form>
      </nav>
    </header>
  );
}

export default Header;
