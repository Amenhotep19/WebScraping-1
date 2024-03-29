const requestPromise = require('request-promise');
const otocsv = require('objects-to-csv');
const cheerio = require('cheerio');

const baseURL = 'https://www.yellowpages.com';
const searchURL = '/search?search_terms=pizza&geo_location_terms=New+York%2C+NY';

const getCompanies = async () => {
  const html = await requestPromise(baseURL + searchURL);
  const businessMap = cheerio('a.business-name', html).map(async (i, e) => {
    const link = baseURL + e.attribs.href;
    const innerHtml = await requestPromise(link);
    const emailAddress = cheerio('a.email-business', innerHtml).prop('href');
    const name = e.children[0].data;
    const phone = cheerio('p.phone', innerHtml).text();
    return {
      emailAddress,
      link,
      name,
      phone,
    }
  }).get();
  return Promise.all(businessMap);
};

getCompanies()
  .then(result => {
    console.log(result)
    const transformed = new otocsv(result);
    return transformed.toDisk('./output.csv');
  })
  .then(() => console.log('Successfully Scraped Pizza Company Information in New York'));
