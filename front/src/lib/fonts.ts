import localFont from 'next/font/local';

export const mbCorpo = localFont({
  src: [
    {
      path: '../fonts/Mb-font.woff2',     
      weight: '400',                      
      style: 'normal',
    },
  ],
  variable: '--font-mb-corpo',            
  display: 'swap',                        
  preload: true,
});