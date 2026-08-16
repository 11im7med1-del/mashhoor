const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.setDefaultTimeout(10000);
  
  try {
    await page.goto('http://localhost:8000', { waitUntil: 'networkidle0' });
    
    // Check if page has any visible content
    const bodyBgColor = await page.evaluate(() => {
      const body = document.body;
      return window.getComputedStyle(body).backgroundColor;
    });
    
    const rootElement = await page.evaluate(() => {
      const root = document.getElementById('root');
      if (!root) return 'NO_ROOT_ELEMENT';
      return root.innerHTML.length > 0 ? 'HAS_CONTENT' : 'EMPTY_ROOT';
    });
    
    console.log('Body background:', bodyBgColor);
    console.log('Root element:', rootElement);
    
    // Take screenshot
    await page.screenshot({ path: '/tmp/mashhoor-screenshot.png', fullPage: true });
    console.log('✓ Screenshot saved to /tmp/mashhoor-screenshot.png');
    
    // Check for errors in console
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Console error:', msg.text());
      }
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
