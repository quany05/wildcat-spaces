import { searchSpaces } from '@/lib/spaces';
export async function GET(request:Request){try{return Response.json(searchSpaces(new URL(request.url).searchParams),{headers:{'Cache-Control':'no-store'}});}catch(e){return Response.json({error:e instanceof Error?e.message:'Search failed.'},{status:400});}}
