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
    const string = $('a[href*="/r/"] > div > h3', html).text()
    let redditPosts = [];
    redditPosts.push(string)
    return redditPosts
  })
  .then(data => {
    console.log(data)
  })
  .catch(function(error) {
    console.log(error)
  });
