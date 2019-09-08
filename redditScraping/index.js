const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.reddit.com';

puppeteer
  .launch()
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then((html) => {
    const redditpostsLength = $('div > h3', html).text().length;
    const redditPosts = [];
    for (let i = 0; i < 1; i++) {
      console.log($('div > h3', html).toString())
      $('div > h3', html).each(post => {
        console.log(post)
        // redditPosts.push(post)
      })
    }
      return redditPosts
  })
  .then(data => {
    console.log(data)
  })
  .catch(function(error) {
    console.log(error)
  });
