import { useState } from 'react';
import html2canvas from 'html2canvas';
import { Button } from '@consta/uikit/Button';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';

export interface SelectItem {
  label: string;
  id: number;
}

interface ScreenshotButtonProps {
  selectItems: SelectItem[];
  onSelectChange: (item: SelectItem | null) => void;
  selectedValue: SelectItem | null;
  currentPagePath: string;
}

export const ScreenshotButton = ({
  selectItems,
  onSelectChange,
}: ScreenshotButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  let isFirstPage = true;

  const captureFullPage = async (
    pdf: jsPDF,
    title: string,
    isLastScreenshot: boolean = false
  ) => {
    window.scrollTo(0, 0);
    await delay(800);

    const options = {
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
      scale: 0.5,
      useCORS: true,
      allowTaint: true,
      logging: true,
      onclone: (clonedDoc: Document) => {
        const elements = clonedDoc.querySelectorAll('.tooltip, .popover');
        elements.forEach((el) => el.remove());
      }
    };

    const canvas = await html2canvas(document.documentElement, options);
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
    const scaledWidth = imgProps.width * ratio;
    const scaledHeight = imgProps.height * ratio;

    if (isFirstPage) {
      if (!isLastScreenshot) {
        isFirstPage = false;
      }
    } else {
      pdf.addPage();
    }

    if (isLastScreenshot) {
      isFirstPage = false;
    }

    const x = (pdfWidth - scaledWidth) / 2;
    const y = (pdfHeight - scaledHeight) / 2;

    pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
    pdf.text(title, 10, 10);
  };

  const captureMainPage = async (pdf: jsPDF) => {
    navigate('/');
    await delay(1500);
    await captureFullPage(pdf, 'Main page');
    isFirstPage = false;
  };

  const waitForSelectUpdate = async (expectedValue: string) => {
    let retries = 10;
    while (retries > 0) {
      await delay(400);

      const selectElement = document.getElementById('selector');
      if (!selectElement) continue;

      const currentDisplayValue = selectElement.querySelector('.Select-ControlValue')?.textContent?.trim();
      const currentTitleValue = selectElement.querySelector('.Select-ControlValue')?.getAttribute('title');
      const inputValue = (selectElement.querySelector('input.Select-FakeField') as HTMLInputElement)?.value;

      if (
        currentDisplayValue === expectedValue ||
        currentTitleValue === expectedValue ||
        inputValue === expectedValue
      ) {
        return true;
      }

      retries--;
    }
    return false;
  };

  const tryChangeByClicks = async (item: SelectItem) => {
    const selectElement = document.getElementById('selector');
    if (!selectElement) return false;

    const dropdownButton = selectElement.querySelector('.Select-IndicatorsDropdown') as HTMLElement;
    if (dropdownButton) {
      dropdownButton.click();
      await delay(1000);
    }

    await delay(500);
    const options = Array.from(document.querySelectorAll('[role="option"]')) as HTMLElement[];

    const targetOption = options.find(opt => {
      const title = opt.getAttribute('title');
      const text = opt.textContent?.trim();
      return title === item.label || text === item.label;
    });

    if (!targetOption) return false;

    targetOption.click();
    await delay(800);
    return true;
  };

  const tryChangeByInput = async (item: SelectItem) => {
    const selectElement = document.getElementById('selector');
    if (!selectElement) return false;

    const input = selectElement.querySelector('input.Select-FakeField') as HTMLInputElement;
    if (!input) return false;

    input.value = item.label;
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
    await delay(500);

    const changeEvent = new Event('change', { bubbles: true });
    input.dispatchEvent(changeEvent);
    await delay(500);

    return true;
  };

  const tryChangeByState = async (item: SelectItem) => {
    onSelectChange(item);
    await delay(800);
    return true;
  };

  const changeSelectValue = async (item: SelectItem) => {
    await tryChangeByClicks(item);
    let isUpdated = await waitForSelectUpdate(item.label);

    if (!isUpdated) {
      await tryChangeByInput(item);
      isUpdated = await waitForSelectUpdate(item.label);
    }

    if (!isUpdated) {
      await tryChangeByState(item);
      isUpdated = await waitForSelectUpdate(item.label);
    }
  };

  const capturePageWithVariants = async (pdf: jsPDF) => {
    navigate('/page');
    await delay(2000);

    for (const [index, item] of selectItems.entries()) {
      await changeSelectValue(item);

      window.scrollTo(0, document.documentElement.scrollHeight);
      await delay(1000);
      window.scrollTo(0, 0);
      await delay(1000);

      if (index > 0) {
        pdf.addPage();
      }

      await captureFullPage(pdf, `Group: ${item.label}`);
    }
  };

  const handleCaptureAll = async () => {
    setIsProcessing(true);
    const pdf = new jsPDF('p', 'mm', 'a4');

    try {
      await captureMainPage(pdf);
      await capturePageWithVariants(pdf);
      pdf.save('Otchet.pdf');
    } catch (error) {
      console.error('Error PDF:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      label={isProcessing ? 'Создание отчета...' : 'Создать отчет (PDF)'}
      onClick={handleCaptureAll}
      disabled={isProcessing}
      loading={isProcessing}
    />
  );
};