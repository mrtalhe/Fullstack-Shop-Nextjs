import Footer from '@/components/footer';
import Header from '@/components/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
