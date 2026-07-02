import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to simulated mobile dimensions (iPhone X/11/12/13 mini width)
  await page.setViewport({ width: 375, height: 812 });

  await page.goto('http://localhost:5173/');
  
  // Wait for React to render
  await new Promise(r => setTimeout(r, 2000));

  const result = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const winWidth = window.innerWidth;
    
    // Check if any elements are causing horizontal overflow
    const elements = document.querySelectorAll('*');
    const overflowingElements = [];
    
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > winWidth) {
        overflowingElements.push({
          tagName: el.tagName,
          className: el.className,
          right: rect.right
        });
      }
    });
    
    return {
      hasHorizontalOverflow: docWidth > winWidth,
      documentWidth: docWidth,
      windowWidth: winWidth,
      overflowingElements
    };
  });

  console.log("LAYOUT VERIFICATION RESULT:");
  console.log(JSON.stringify(result, null, 2));

  if (result.hasHorizontalOverflow) {
    console.error("100% clean mobile layout verification FAILED. Overflow detected.");
    process.exit(1);
  } else {
    console.log("100% clean mobile layout verification PASSED. Zero overflow detected.");
  }

  await browser.close();
})();
