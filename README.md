# Clash Royale Elixir Counter
[Clash Royale](https://clashroyale.com/) is a mobile game where users collect cards and use them to battle other players online. Each card in the game is assigned a cost, which represents the amount of elixir required to play that card. Users will acquire one elixir every 2.8 seconds in standard play. This app tries to count the number of elixir the opponent has to better coordinate the user's attack.

This was built using TDD and Typescript, and without heavy frameworks such as React and Vue. Mocha, Chai, Selenium, and NightWatch were used to test this program.

## Getting Started
1. Clone repository
```
  $ git clone https://github.com/k3ntako/Clash-Royale-Elixir-Counter.git
```

2. Install dependencies
```
  $ cd Clash-Royale-Elixir-Counter
  $ npm i
```

3. Install Selenium dependencies ([more here](https://github.com/vvo/selenium-standalone/blob/master/README.md#install--run))
```
  $ ./node_modules/.bin/selenium-standalone install
```

4. Get an API key
  - Follow the instructions on [RoyaleAPI's website](https://docs.royaleapi.com/#/authentication?id=generating-new-keys). At the time of writing, it involves joining their Discord server.
  - Create an file in the project's root directory: `.env`.
  The file should look like (replace `MY_API_KEY` with  the API key provided by RoyaleAPI):
  ```
    ROYALE_API_KEY=MY_API_KEY
  ```

5. Get the location of your `index.html` file
  - Open `index.html` in a browser (e.g., Chrome), and copy the address in the URL bar. Add it to the `.env` file that you created in the previous step as `INDEX_URL`. Your file should look something like this:
  ```
    ROYALE_API_KEY=MY_API_KEY
    INDEX_URL=file:///Users/MyName/Desktop/Projects/Clash-Royale-Elixir-Counter/index.html
  ```

6. Start the tests
```
  $ npm test && npm test-nw
```

## Why Selenium and NightWatch?
-  JSDOM does not support [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), so it's not easily possible to test this website using JSDOM. More on this issue [here](https://github.com/jsdom/jsdom/issues/1030).
  - Selenium replies on browser, so it can test on modern browsers without worrying about continued support.
- "Karma has primarily been designed for low level (unit) testing." As mentioned on their [FAQ](http://karma-runner.github.io/4.0/intro/faq.html) Karma is built more for unit testing opposed to acceptance testing. I wanted the ability to work on a higher level and chose to go with [NightWatch](https://nightwatchjs.org/).