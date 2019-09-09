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
    const string = $('a[href*="/r/"] > div > h3', html).toString()
    console.log(string)
    const htmlTagRegex = new RegExp("\s+(<[^>]*>)", "g");
    const redditPosts = string.split(htmlTagRegex)
    console.log(redditPosts)
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
