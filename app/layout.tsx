import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shruti Gupta — Full-stack software developer',
  description: 'Portfolio of Shruti Gupta, a full-stack software developer building thoughtful web products and data-rich experiences.',
  openGraph: {
    title: 'Shruti Gupta — Full-stack software developer',
    description: 'Thoughtful web products, dashboards, and digital experiences.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
