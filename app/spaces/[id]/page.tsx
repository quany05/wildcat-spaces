import StudyApp from '@/components/study-app';
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <StudyApp initialSpace={id}/>}
