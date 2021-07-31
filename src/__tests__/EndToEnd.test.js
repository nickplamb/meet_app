import { afterAll, beforeAll, describe, expect, jest } from "@jest/globals";
import puppeteer from 'puppeteer';


describe('show/hide an event details', () => {
  let browser, page;

  jest.setTimeout(30000);
  beforeAll(async () => {
    // browser = await puppeteer.launch({
    //   headless: false,
    //   slowMo: 250,
    //   ignoreDefaultArgs: ['--disable-extensions'],
    // });
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');

    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .more-details');
    
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .more-details');
    
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .more-details');

    expect(eventDetails).toBeNull();
  });
});