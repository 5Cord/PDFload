import cl from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={cl.footer}>
      <span>© {new Date().getFullYear()} PDFload</span>
    </footer>
  );
}
