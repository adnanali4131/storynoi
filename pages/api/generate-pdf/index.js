import puppeteer from "puppeteer";

export default async function handler(req, res) {
  const { storyContent } = JSON.parse(req.body);
  const browser = await puppeteer.launch();
  try {
    let pageContent = "";

    for (let i = 0; i < storyContent.length; i++) {
      pageContent +=
        storyContent[i].image.length > 0
          ? `<div
          key={${storyContent[i].heading}}
          style="display:flex; height:100%; width:100%; justify-content:center; align-items:center; flex-direction:column; page-break-after:always"
        >
          <img src="${storyContent[i].image}" alt="${storyContent[i].heading}" style="width:100px, height:100px" />
        </div>
        <div
      key={${storyContent[i].heading}}
      style="display:flex; height:100%; width:100%; justify-content:center; align-items:center; flex-direction:column; page-break-after:always"
    >
    <div style="width:75%;justify-content:center; align-items:center; flex-direction:column; display:flex;">
    <h1>${storyContent[i].heading}</h1>
    <p style="text-align:center">${storyContent[i].description}</p>
    </div>
    </div>
        `
          : `<div
      key={${storyContent[i].heading}}
      style="display:flex; height:100%; width:100%; justify-content:center; align-items:center; flex-direction:column; page-break-after:always"
    >
      <div style="width:75%;justify-content:center; align-items:center; flex-direction:column; display:flex;">
      <h1>${storyContent[i].heading}</h1>
      <p style="text-align:center">${storyContent[i].description}</p>
      </div>
    </div>`;
    }

    const pdfBufferArray = [];

    const page = await browser.newPage();
    await page.goto("about:blank");
    await page.setContent(pageContent);

    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    });

    pdfBufferArray.push(pdfBuffer);

    await page.close();

    await browser.close();
    const combinedPdfBuffer = Buffer.concat(pdfBufferArray);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=story.pdf");
    res.status(200).send(combinedPdfBuffer);
  } catch (error) {
    console.error("Error:", error);
    await browser.close();
    res.status(500).send("Internal Server Error");
  }
}
