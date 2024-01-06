import { Noto_Sans_JP } from 'next/font/google';
import { css } from '../../styled-system/css';
import { center } from '../../styled-system/patterns';
import './globals.css';

const font = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata = {
  title: 'UMAAJI Analyzer',
  description: 'Analyze UMAAJI of Japanese horse racing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <main className={center()}>
          <div className={css({ minW: '375px' })}>{children}</div>
        </main>
      </body>
    </html>
  );
}
