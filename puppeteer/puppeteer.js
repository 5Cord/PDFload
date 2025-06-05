import puppeteer from 'puppeteer';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

async function processPages() {
    const browser = await puppeteer.launch({ headless: false });
    const imagePaths = [];

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });

        await page.goto('http://localhost:5173');
        await page.waitForSelector('body', { timeout: 3000 });

        const mainPath = 'screenshot_main_page.png';
        await page.screenshot({ path: mainPath, fullPage: true });
        imagePaths.push(mainPath);

        await new Promise(resolve => setTimeout(resolve, 1000));

        await page.goto('http://localhost:5173/page');
        await page.waitForSelector('#container');
        await page.waitForSelector('#selector-input');

        await page.click('#selector-input');
        await page.waitForSelector('.ListItem.ListItem_interactive', { timeout: 3000 });

        const options = await page.$$('.ListItem.ListItem_interactive');
        if (options.length === 0) throw new Error('Не найдено вариантов в выпадающем списке');

        for (let i = 0; i < options.length; i++) {
            await page.click('#selector-input');
            await page.waitForSelector('.ListItem.ListItem_interactive', { timeout: 3000 });

            const currentOptions = await page.$$('.ListItem.ListItem_interactive');
            await currentOptions[i].click();

            await page.waitForSelector('#studentCard', { timeout: 3000 });

            const groupName = await page.evaluate(el => el.textContent, currentOptions[i]);
            const safeGroupName = groupName.replace(/[^a-zA-Z0-9-]/g, '_');

            const screenshotPath = `screenshot_${safeGroupName}.png`;
            await page.screenshot({ path: screenshotPath, fullPage: true });

            imagePaths.push(screenshotPath);

            await new Promise(resolve => setTimeout(resolve, 1000));
        }

    } catch (error) {
        console.error('Ошибка:', error);
    } finally {
        await browser.close();
    }

    await createPdfFromImages(imagePaths);
}

async function createPdfFromImages(imagePaths) {
    const pdfDoc = await PDFDocument.create();

    for (const imagePath of imagePaths) {
        const imageBytes = fs.readFileSync(imagePath);
        const image = await pdfDoc.embedPng(imageBytes);
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
        });
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = 'screenshots_output.pdf';
    fs.writeFileSync(outputPath, pdfBytes);
    console.log(`PDF-файл создан: ${outputPath}`);

    for (const imagePath of imagePaths) {
        try {
            fs.unlinkSync(imagePath);
            console.log(`Удалён файл: ${imagePath}`);
        } catch (err) {
            console.warn(`Не удалось удалить ${imagePath}:`, err);
        }
    }
}

processPages();
