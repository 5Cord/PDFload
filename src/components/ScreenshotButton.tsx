//Тестовая фича
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Button } from '@consta/uikit/Button';
import { jsPDF } from 'jspdf';

export const ScreenshotButton = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    const captureFullPage = async (pdf: jsPDF, groupName?: string) => {
        const originalScrollPosition = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        let currentPosition = 0;
        let pageNumber = 1;

        while (currentPosition < totalHeight) {
            window.scrollTo(0, currentPosition);
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(document.documentElement, {
                scrollX: -window.scrollX,
                scrollY: -window.scrollY,
                windowWidth: document.documentElement.scrollWidth,
                windowHeight: viewportHeight,
                scale: 1
            });

            const imgData = canvas.toDataURL('image/png');

            if (pageNumber > 1) {
                pdf.addPage();
            }

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            currentPosition += viewportHeight;
            pageNumber++;
        }

        window.scrollTo(0, originalScrollPosition);
    };

    const captureSelectOptions = async (pdf: jsPDF) => {
        const select = document.querySelector('.Select-Select') as HTMLSelectElement;
        if (!select) return;

        const options = Array.from(select.options);

        for (const option of options) {
            if (option.value) {
                select.value = option.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));

                await new Promise(resolve => setTimeout(resolve, 1000));

                const canvas = await html2canvas(document.documentElement, {
                    scrollX: -window.scrollX,
                    scrollY: -window.scrollY,
                    windowWidth: document.documentElement.scrollWidth,
                    windowHeight: document.documentElement.scrollHeight,
                    scale: 1
                });

                const imgData = canvas.toDataURL('image/png');
                pdf.addPage();

                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

                pdf.text(`Группа: ${option.text}`, 10, 10);
            }
        }
    };

    const handleCaptureAll = async () => {
        setIsProcessing(true);

        try {
            const pdf = new jsPDF('p', 'mm', 'a4');

            await captureFullPage(pdf, 'Initial State');

            await captureSelectOptions(pdf);

            pdf.save('full_report.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Button
            label={isProcessing ? "Формирование отчета..." : "Создать полный отчет (PDF)"}
            onClick={handleCaptureAll}
            size="m"
            disabled={isProcessing}
        />
    );
};