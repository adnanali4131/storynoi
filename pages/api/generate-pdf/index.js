import puppeteer from "puppeteer";
export default async function handler(req, res) {
  const { storyContent } = JSON.parse(req.body);
  const browser = await puppeteer.launch();
  try {
    let pageContent = "";

    for (let i = 0; i < storyContent.length; i++) {
      if (
        storyContent[i].heading !== "Summary" &&
        storyContent[i].heading !== "Discussions"
      )
        pageContent +=
          storyContent[i].image && storyContent[i].image.length > 0
            ? `<div
          key={${storyContent[i].heading}}
          style="display:flex; height:100%; width:100%; justify-content:center; align-items:center; flex-direction:column; page-break-after:always; position:relative"
        >
        <img src="https://storynoi.s3.us-east-2.amazonaws.com/watermark.png" alt="watermark" style="position:fixed; width:100vw; height:100vh;z-index:100" />
          <img src="${storyContent[i].image}" alt="${
                storyContent[i].heading
              }" style="width:100px, height:100px" />
        </div>
        <div
      key={${storyContent[i].heading}}
      style="display:flex; height:100%; width:100%; justify-content:center; align-items:center; flex-direction:column; page-break-after:always; position:relative;"
    >
    <img src="https://storynoi.s3.us-east-2.amazonaws.com/watermark.png" alt="watermark" style="position:fixed; width:100vw; height:100vh; z-index:100" />
    <div style="font-family: 'Noto Sans Symbols' , sans-serif ;width:75%;justify-content:center; align-items:center; flex-direction:column; display:flex;">
    ${
      ["Title", "Moral"].includes(storyContent[i].heading)
        ? ` <h1 style="margin:0;font-size:24px">${storyContent[i].heading}</h1>`
        : ""
    }
    <p style="text-align:center margin:0; font-size:18px">${
      storyContent[i].description
    }</p>
    </div>
    </div>
        `
            : `<div
      key={${storyContent[i].heading}}
      style="font-family: 'Noto Sans Symbols', sans-serif;
      display:flex; height:100%; width:100%; justify-content:center; align-items:center; flex-direction:column; page-break-after:always; position:relative"
    >
    <img src="https://storynoi.s3.us-east-2.amazonaws.com/watermark.png" alt="watermark" style="position:fixed; width:100vw; height:100vh;z-index:100" />
      <div style="width:75%;justify-content:center; align-items:center; flex-direction:column; display:flex;">
      
      ${
        ["Title", "Moral"].includes(storyContent[i].heading)
          ? ` <h1 style="margin:0;font-size:24px">${storyContent[i].heading}</h1>`
          : ""
      }
      <p style="text-align:center; margin:0;font-size:18px;">${
        storyContent[i].description
      }</p>
      </div>
    </div>`;
    }

    const pdfBufferArray = [];

    const page = await browser.newPage();
    await page.goto("about:blank");
    await page.setContent(pageContent);

    const pdfBuffer = await page.pdf({
      height: "512px",
      width: "512px",
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
    await browser.close();
    res.status(500).send("Internal Server Error");
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "7mb", // Set desired value here
    },
  },
};
