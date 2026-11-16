import { spaces } from '@/lib/spaces';
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const s=spaces.find(s=>s.id===id);return Response.json(s||{error:'Space not found'},{status:s?200:404,headers:{'Cache-Control':'no-store'}});}
