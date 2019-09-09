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
    console.log($('a[href*="/r/"] > div > h3', html).toString())
    console.log($('a[href*="/r/"] > h3', html).toString())
    const redditPosts = [];
    // $('a[href*="/r/"] > div > h3', html).each(function() {
    //   redditPosts.push({
    //     title: $(this).text(),
    //   });
    return redditPosts
  })
  .then(data => {
    console.log(data)
  })
  .catch(function(error) {
    console.log(error)
  });
