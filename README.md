# Clash Royale Elixir Counter
[Clash Royale](https://clashroyale.com/) is a mobile game where users collect cards and use them to battle other players online. Each card in the game is assigned a cost, which represents the amount of elixir required to play that card. Users will acquire one elixir every 2.8 seconds in standard play. This app tries to count the number of elixir the opponent has to better coordinate the user's attack.

This was built using TDD and Typescript, and without heavy frameworks such as React and Vue. Mocha, Chai, and Selenium were used to test this program. I was inspired by this [article](https://blog.bitsrc.io/can-you-build-web-apps-in-2019-without-a-framework-1065ad82b79f) to build a website and limit the number of libraries outside of testing and Typescript.

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

5. Start the tests
```
  $ npm test && npm test-nw
```

## Why Selenium?
-  JSDOM does not support [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), so it's not easily possible to test this website using JSDOM. More on this issue [here](https://github.com/jsdom/jsdom/issues/1030).
  - Selenium replies on browser, so it can test on modern browsers without worrying about continued support.
- "Karma has primarily been designed for low level (unit) testing." As mentioned on their [FAQ](http://karma-runner.github.io/4.0/intro/faq.html) Karma is built more for unit testing opposed to acceptance testing.
- Initially, I wanted to work with NightWatch, however, they do not support Shadow DOM.
  - As mentionned above, Selenium is able to render Shadow DOMs unlike JSDOM, but like NightWatch, it also does not support querying Shadow DOM elements (i.e., WebElement.element() will not return elements in the Shadow DOM).
  - After finding this wonderful [article](https://medium.com/rate-engineering/a-guide-to-working-with-shadow-dom-using-selenium-b124992559f) with a method to work around this issue, I figured that NightWatch was an unnecessary extra layer.

## Resources
- [Mocha documentation](https://mochajs.org/) - Mocha is a Javascript test runner.
- [Chai documentation](https://www.chaijs.com/guide/) - Chai is a BDD/TDD assertion library.
- [selenium-webdriver documentation](https://selenium.dev/selenium/docs/api/javascript/index.html) - Selenium is a browser automation library.
- [Building Components](https://developers.google.com/web/fundamentals/web-components) - A collection of articles by Google on building web components.
  - [Shadow DOM v1: Self-Contained Web Components](https://developers.google.com/web/fundamentals/web-components/shadowdom)


## Other Notes
### Pros and Cons of Shadow DOM
Shadow DOM offers isolation from the rest of the DOM. This can be beneficial for having scoped CSS, so that the developer does not have to worry about clashes in IDs and class names. This also means that the developer can query using a class, and/or a tag name without getting a long list of results. This allows the developer to build components and think about it in compartments instead of dealing  with  the whole webpage at a time.

However this has its drawbacks as well. Web components are relatively new and many libraries including JSDOM, Selenium, and NightWatch do not support it. Additionally, querying an element takes two steps: 1) finding the component and 2) finding  the element inside the component.