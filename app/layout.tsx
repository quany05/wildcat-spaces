import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Wildcat Spaces · Find your study spot',description:'Find a Northwestern study space that fits what you want to do. An activity-first student prototype.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
