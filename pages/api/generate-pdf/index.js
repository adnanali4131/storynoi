import puppeteer from "puppeteer";

export default async function handler(req, res) {
  const { storyContent } = JSON.parse(req.body);
  const browser = await puppeteer.launch();
  try {
    const pageContent = storyContent.map((content) => {
      return content.image.length > 0
        ? `<div
          key={${content.heading}}
          style="display:flex; height:100%; width:100%; justify-content:center; align-items:center; flex-direction:column; page-break-after:always"
        >
          <img src={${content.image}} style="width:1024px; height:1024px" />
        </div>
        <div
      key={${content.heading}}
      style="display:flex; height:100%; width:100%; justify-content:center; align-items:center; flex-direction:column; page-break-after:always"
    >
      <h1>${content.heading}</h1>
      <p>${content.description}</p>
    </div>
        `
        : `<div
      key={${content.heading}}
      style="display:flex; height:100%; width:100%; justify-content:center; align-items:center; flex-direction:column; page-break-after:always"
    >
      <h1>${content.heading}</h1>
      <p>${content.description}</p>
    </div>`;
    });
    const pdfBufferArray = [];

    const page = await browser.newPage();

    await page.setContent(pageContent.join(" "));

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
