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
    console.log($('div > h3', html).text().length)
    return {
      total: $('div > h3', html).text().length,
      html: html
    }
  })
  .then(object => {
    const redditPosts = [];
    for (let i = 0; i < object.total; i++) {
      redditPosts.push($('div > h3', object.html).text());
    }
    return redditPosts
  })
  .catch(function(error) {
    console.log(error)
  });
