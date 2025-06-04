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
  selectedValue,
  currentPagePath,
}: ScreenshotButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const captureFullPage = async (pdf: jsPDF, title: string) => {
    window.scrollTo(0, 0);
    await delay(500); 

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

    try {
      const canvas = await html2canvas(document.documentElement, options);
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
      const scaledWidth = imgProps.width * ratio;
      const scaledHeight = imgProps.height * ratio;

      if (pdf.getNumberOfPages() > 0) {
        pdf.addPage();
      }

      const x = (pdfWidth - scaledWidth) / 2;
      const y = (pdfHeight - scaledHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
      pdf.text(title, 10, 10);
    } catch (error) {
      console.error('Ошибка при создании скриншота:', error);
      throw error;
    }
  };

  const captureAllSelectVariants = async (pdf: jsPDF) => {
    const originalValue = selectedValue;
    
    try {
      for (const item of selectItems) {
        onSelectChange(item);
        await delay(1500);
        
        window.scrollTo(0, document.documentElement.scrollHeight);
        await delay(500);
        window.scrollTo(0, 0);
        await delay(500);
        
        await captureFullPage(pdf, `Группа: ${item.label}`);
      }
    } finally {
      if (originalValue) {
        onSelectChange(originalValue);
        await delay(500);
      }
    }
  };

const handleCaptureAll = async () => {
  setIsProcessing(true);
  const pdf = new jsPDF('p', 'mm', 'a4');
  const originalPath = window.location.pathname;

  try {
    if (currentPagePath !== '/page') {
      navigate('/page');
      await delay(2000); 
    }

    await captureAllSelectVariants(pdf);

    navigate('/');
    await delay(2000); 

    await captureFullPage(pdf, 'Главная страница');

    pdf.save('full_page_groups_report.pdf');
  } catch (error) {
    console.error('Ошибка при генерации PDF:', error);
  } finally {
    if (window.location.pathname !== originalPath) {
      navigate(originalPath);
    }
    setIsProcessing(false);
  }
};


  return (
    <Button
      label={isProcessing ? 'Создание полного отчета...' : 'Создать полный отчет (PDF)'}
      onClick={handleCaptureAll}
      disabled={isProcessing}
      loading={isProcessing}
    />
  );
};