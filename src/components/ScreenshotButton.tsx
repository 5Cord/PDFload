import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Button } from '@consta/uikit/Button';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';
import { Select } from '@consta/uikit/Select';

type PageInfo = {
  path: string;
  name: string;
  hasSelect?: boolean;
};

type SelectRefType = React.RefObject<React.ComponentRef<typeof Select>>;

export const ScreenshotButton = ({ selectRef }: { selectRef?: SelectRefType }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const pages: PageInfo[] = [
    { path: '/', name: 'Главная страница' },
    { 
      path: '/page', 
      name: 'Страница карточки',
      hasSelect: true
    },
  ];

  const captureFullPage = async (pdf: jsPDF, pageName: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const canvas = await html2canvas(document.documentElement, {
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
      scale: 0.5,
    });

    const imgData = canvas.toDataURL('image/png');
    
    if (pdf.getNumberOfPages() > 0) {
      pdf.addPage();
    }

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const scale = Math.min(
      pdfWidth / imgProps.width,
      pdf.internal.pageSize.getHeight() / imgProps.height
    );

    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
      imgProps.width * scale,
      imgProps.height * scale
    );

    pdf.text(pageName, 10, 10);
  };

  const captureSelectOptions = async (pdf: jsPDF) => {
    if (!selectRef?.current) return;

    try {
      const currentValue = selectRef.current.props.value;
      const items = selectRef.current.props.items || [];
      
      const toggleButton = document.querySelector('.Select-Control');
      if (toggleButton) {
        (toggleButton as HTMLElement).click();
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      for (const item of items) {
        const option = document.querySelector(`[aria-label="${item.label}"]`);
        if (option) {
          (option as HTMLElement).click();
          await new Promise(resolve => setTimeout(resolve, 1000));
          await captureFullPage(pdf, `Страница карточки - ${item.label}`);
        }
      }

      if (currentValue) {
        selectRef.current.props.onChange?.(currentValue);
      }
    } catch (error) {
      console.error('Error capturing select options:', error);
    }
  };

  const handleCaptureAll = async () => {
    setIsProcessing(true);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const originalPath = window.location.pathname;

    try {
      for (const page of pages) {
        navigate(page.path);
        await new Promise(resolve => setTimeout(resolve, 1500));

        await captureFullPage(pdf, page.name);

        if (page.hasSelect && selectRef) {
          await captureSelectOptions(pdf);
        }
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      navigate(originalPath);
      pdf.save('full_site_report.pdf');
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