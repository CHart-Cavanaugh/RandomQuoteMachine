$("document").ready(() => {

  const setAttr = (target, attrName, newAttrVal) => {
    $(target).attr(attrName, newAttrVal);
  };

  const setProperty = (target, propName, newPropVal) => {
    $(target).css(propName, newPropVal);
  };
  const getPageHue = (() => {
    let hueIndex = 0;
    const backgroundHues = [];
    for (let i = 0; i < 360; i += 30) {
      backgroundHues.push(i);
    }
    return () => {
      if (hueIndex < backgroundHues.length)
        return backgroundHues[hueIndex++]

      hueIndex = 0;
      return backgroundHues[hueIndex++];
    }
  })();
  const applyClasses = (target, newClasses = "") => {
    setAttr(target, "class", newClasses);
  };

  const setupQuotes = () => {

    const Quote = function (quote, author) {
      this._quote = quote;
      this._author = author;
    }
    const quotes = [];

    quotes.push(new Quote(
      `"Not all those who wander are lost."`,
      "Bilbo Baggins"
    ));
    quotes.push(new Quote(
      `"Deeds will not be less valiant because 
          they are unpraised."`,
      "Aragorn"
    ));
    quotes.push(new Quote(
      `"It’s the job that’s never started as takes
          longest to finish."`,
      "Sam Gamgee"
    ));
    quotes.push(new Quote(
      `"Despair is only for those who see the end 
          beyond all doubt. We do not."`,
      "Gandalf"
    ));
    quotes.push(new Quote(
      `"All we have to decide is what to do with 
          the time that is given us."`,
      "Gandalf"
    ));
    quotes.push(new Quote(
      `"It is a strange fate that we should suffer 
          so much fear and doubt over so small a 
          thing … such a little thing."`,
      "Boromir"
    ));
    quotes.push(new Quote(
      `"Don’t adventures ever have an end? I suppose
          not. Someone else always has to carry on the 
          story."`,
      "Bilbo Baggins"
    ));
    quotes.push(new Quote(
      `"This day does not belong to one man but to 
          all. Let us together rebuild this world that 
          we may share in the days of peace."`,
      "Aragorn"
    ));
    quotes.push(new Quote(
      `"Courage is found in unlikely places."`,
      "Gildor"
    ));
    quotes.push(new Quote(
      `"I can avoid being seen, if I wish, but to 
          disappear entirely, that is a rare gift."`,
      "Aragorn"
    ));
    quotes.push(new Quote(
      `"I don't know half of you half as well as I 
          should like, and I like less than half of 
          you half as well as you deserve."`,
      "Bilbo Baggins"
    ));
    quotes.push(new Quote(
      `"Do not be so quick to deal out death and 
          judgment. Even the very wise do not see all 
          ends."`,
      "Gandalf"
    ));
    quotes.push(new Quote(
      `"There is no secret worth concealing with 
          deception."`,
      "Elrond"
    ));
    quotes.push(new Quote(
      `"Nothing is evil in the beginning."`,
      "Galadriel"
    ));
    quotes.push(new Quote(
      `"If we didn't do everything we weren't 
          supposed to, we'd hardly do anything at 
          all."`,
      "Nori Brandyfoot"
    ));
    quotes.push(new Quote(
      `"Hope is never mere, even when it is 
          meager."`,
      "Gil-Galad"
    ));

    return [...quotes];

  };
  const getQuote = (() => {

    const randomSort = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = arr[i];
        arr[j] = arr[i]
        arr[i] = k;
      }
    }
    let currIndex = 0;
    const quotes = setupQuotes();
    const getQuote = () => {
      if (currIndex >= quotes.length) {
        currIndex = 0;
        randomSort(quotes);
      }

      return quotes[currIndex++];
    };

    randomSort(quotes);

    return getQuote;

  })();

  const setupAppContainer = () => {

    let newBgColor;

    getPageHue();

    newBgColor = `linear-gradient(
          45deg,
          hsl(${getPageHue()} 85% 50%),
          hsl(${getPageHue()} 85% 50%),
          hsl(${getPageHue()} 85% 50%)
        )`

    setProperty("#new-background", "height", "100vh");
    setProperty("#new-background", "width", "100vw");
    setProperty("#new-background", "background", newBgColor);
    setProperty("#new-background", "position", "fixed");
    setProperty("#new-background", "z-index", "-2");

    setProperty("#current-background", "height", "100vh");
    setProperty("#current-background", "width", "100vw");
    setProperty("#current-background", "background", newBgColor);
    setProperty("#current-background", "position", "fixed");
    setProperty("#current-background", "z-index", "-1");

    setProperty("#app-container", "height", "100vh");
    setProperty("#app-container", "display", "flex");
    setProperty("#app-container", "justify-content", "center");
    setProperty("#app-container", "align-items", "center");
    setProperty("#app-container", "background", "transparent");
    setProperty("#app-container", "z-index", "0");
  };
  const setupMachine = () => {

    let newBgColor;
    let newQuote = getQuote();
    let fadeActive = false;
    const FADE_SPEED = 1000;
    const handleClick = () => {

      if (!fadeActive) {

        fadeActive = true;

        getPageHue();

        newBgColor = `linear-gradient(
                           45deg,
                           hsl(${getPageHue()} 85% 50%),
                           hsl(${getPageHue()} 85% 50%),
                           hsl(${getPageHue()} 85% 50%)
                       )`;
        newQuote = getQuote();


        setProperty("#new-background", "background", newBgColor);

        $("#current-background").fadeOut(FADE_SPEED * 2, () => {
          setProperty("#current-background", "background", newBgColor);
          $("#current-background").fadeIn(0);
        })
        $("#author").fadeOut(FADE_SPEED);
        $("#text").fadeOut(FADE_SPEED, () => {
          $("#text").text(`${newQuote._quote}`);
          $("#author").text(`${newQuote._author}`);
          $("#author").fadeIn(FADE_SPEED);
          $("#text").fadeIn(FADE_SPEED, () => {
            fadeActive = false;
          });
        });



      }

    }

    //INITIALIZE "#quote-box"
    applyClasses("#quote-box", "p-3 rounded");
    setProperty("#quote-box", "background", "rgba(10, 10, 10, .8)");
    setProperty("#quote-box", "min-width", "21rem");
    setProperty("#quote-box", "max-width", "21rem");

    //INTIALIZE "#quote-box > blockquote"
    applyClasses("#quote-box > blockquote", "blockquote mb-5");
    applyClasses("#quote-box > blockquote > footer", "mt-1 blockquote-footer");
    setProperty("#text", "text-align", "justify");
    applyClasses("#text", "text-light");
    $("#text").text(`${newQuote._quote}`);
    $("#author").text(`${newQuote._author}`);

    //INITIALIZE "#new-quote"
    applyClasses("#new-quote", "me-5 btn btn-primary");
    $("#new-quote").click(handleClick);

    //INITIALIZE "#tweet-quote"
    setProperty('#tweet-quote', "text-decoration-line", "none");
    applyClasses("#tweet-quote", "ms-5 text-light");
    applyClasses("#tweet-quote span", "btn btn-primary");
    applyClasses("#tweet-quote > span > i", "fa fa-twitter fa-lg");

  };



  setupAppContainer();
  setupMachine();
});