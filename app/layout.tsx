import type { Metadata } from 'next';
import { DM_Sans, Outfit } from 'next/font/google';
import './globals.css';
const bodyFont = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const headingFont = Outfit({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });
export const metadata:Metadata={title:'Wildcat Spaces · Find your study spot',description:'Find a Northwestern study space that fits what you want to do. An activity-first student prototype.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}><body>{children}</body></html>}
