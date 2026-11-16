export const activities = [
  { id: 'focus', name: 'Quiet focus', detail: 'Head down. Zone in.', icon: 'book' },
  { id: 'group', name: 'Group study', detail: 'Better minds together.', icon: 'users' },
  { id: 'calls', name: 'Calls & meetings', detail: 'A space to speak up.', icon: 'headphones' },
  { id: 'long', name: 'A longer stay', detail: 'Settle in for a while.', icon: 'coffee' },
];
export const amenityLabels: Record<string,string> = { outlets: 'Power outlets', monitor: 'Monitor / display', whiteboard: 'Whiteboard' };
export type Space = { id:string; name:string; building:string; floor:string; area:string; location:string; description:string; image:string; activities:string[]; noise:string; amenities:string[]; seating:string; capacity:number; groupSize:number; available:number; access:string; reservation:boolean; open:number; close:number; lighting:string; traffic:string; rank:number };
const seeds = [
 ['north-lounge','North Study Lounge','Mudd Library','2nd floor','North Campus','North end of level 2','A bright, tucked-away spot for reading, problem sets, and finding your flow.','northstudylounge',['focus','long'],'quiet',['outlets'],'Individual desks',36,2,14,'students',false,0,24,'Daylight and desk lighting','Low',98],
 ['mudd-commons','Mudd Library Commons','Mudd Library','2nd floor','North Campus','Central commons on level 2','Spread out with your notes or work through ideas together in an open, social setting.','muddcommons',['group','long'],'moderate',['outlets','monitor'],'Shared tables',64,8,23,'students',false,0,24,'Large windows and bright overhead lighting','Moderate',95],
 ['fourth-towers','Fourth Floor Towers','University Library','4th floor','South Campus','Study area beside the tower stacks','A quieter corner of campus, with individual workspaces and books all around.','4-north-stacks',['focus','long'],'quiet',['outlets'],'Individual desks',48,1,18,'everyone',false,8,24,'Soft overhead lighting','Low',93],
 ['mudd-2133','Mudd 2133','Mudd Library','2nd floor','North Campus','Room 2133, level 2','A small enclosed room for project catch-ups, shared screens, and focused conversations.','mudd-2133',['group','calls'],'conversation',['outlets','monitor','whiteboard'],'Shared tables',6,6,6,'students',true,0,24,'Even overhead lighting','Low',91],
 ['one-south','1 South','University Library','1st floor','South Campus','South Tower, level 1','An easy meeting point for study partners, with room to brainstorm and spread out.','1s_350x250',['group','long'],'conversation',['outlets','whiteboard'],'Shared tables',52,6,16,'everyone',false,8,24,'Mixed natural and overhead light','High',90],
 ['mudd-2174','Mudd 2174','Mudd Library','2nd floor','North Campus','Room 2174, level 2','Bring the whole project team. A spacious room for collaborative work and presentations.','2174',['group','calls'],'conversation',['outlets','monitor','whiteboard'],'Shared tables',12,12,12,'students',true,0,24,'Bright overhead lighting','Low',88],
 ['vocal-booth','Vocal Booth','University Library','1st floor','South Campus','North Tower, level 1','A compact enclosed space for a solo online meeting or recording session.','vocalbooth',['calls'],'conversation',['outlets'],'Individual desks',1,1,1,'students',true,9,20,'Controlled indoor lighting','Low',87],
 ['third-towers','Third Floor Towers','University Library','3rd floor','South Campus','East Tower, level 3','A simple, quiet workspace for the reading you have been meaning to finish.','3-east-stacks',['focus','long'],'quiet',[],'Individual desks',42,1,9,'everyone',false,8,24,'Daylight near windows','Low',85],
 ['project-a','Project Room A 1S','University Library','1st floor','South Campus','Room 1740, South Tower','A shared table and display make it easy to turn a group assignment into a plan.','1s1740proja',['group','calls'],'conversation',['outlets','monitor'],'Shared tables',8,8,8,'students',true,8,24,'Warm overhead lighting','Low',84],
 ['mudd-2115','Mudd 2115','Mudd Library','2nd floor','North Campus','Room 2115, level 2','A small team room for talking through the tricky parts of your next assignment.','2115',['group','calls'],'conversation',['outlets','whiteboard'],'Shared tables',4,4,4,'students',true,0,24,'Bright overhead lighting','Low',83],
 ['core-project','Core Project Room (2N)','University Library','2nd floor','South Campus','North Tower, Core project area','A comfortable home for short collaborative sessions and screen sharing.','coreproja',['group','calls'],'moderate',['outlets','monitor'],'Shared tables',6,6,6,'students',true,8,24,'Indoor ambient lighting','Moderate',81],
 ['mudd-2135','Mudd 2135','Mudd Library','2nd floor','North Campus','Room 2135, level 2','A compact room for your next team meeting, with space to sketch ideas together.','mudd-room-2135',['group','calls'],'conversation',['outlets','whiteboard'],'Shared tables',4,4,4,'students',true,0,24,'Even overhead lighting','Low',80],
];
export const spaces: Space[] = seeds.map(r => {
 const [id,name,building,floor,area,location,description,image,activities,noise,amenities,seating,capacity,groupSize,available,access,reservation,open,close,lighting,traffic,rank]=r;
 return {id,name,building,floor,area,location,description,image:'/images/'+image+'.webp',activities,noise,amenities,seating,capacity,groupSize,available,access,reservation,open,close,lighting,traffic,rank} as Space;
});
export const sourceUrl='https://www.library.northwestern.edu/use-the-libraries/spaces-study-rooms/rooms-and-spaces/';
export function hours(s:Space) { return s.open===0 && s.close===24 ? 'Open 24 hours' : `${s.open > 12 ? s.open-12 : s.open}:00 ${s.open>=12?'pm':'am'} – ${s.close===24?'midnight':s.close>12?(s.close-12)+':00 pm':s.close+':00 am'}`; }
export function campusHour(date=new Date()) { return Number(new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',hour:'numeric',hourCycle:'h23'}).format(date)); }
export function isOpen(s:Space,h=campusHour()) {return h>=s.open && h<s.close;}
export type Match = Space & {score:number; missed:{key:string;label:string;weight:number}[]};
export function searchSpaces(params:URLSearchParams, date=new Date()) {
 const activity=params.get('activity')||'';
 if(activity && !activities.some(a=>a.id===activity)) throw new Error('Choose a supported activity.');
 const raw=params.get('people')||'1'; const people=Number(raw);
 if(!Number.isInteger(people)||people<1||people>100) throw new Error('Group size must be a whole number from 1 to 100.');
 const enums:Record<string,string[]>={noise:['quiet','moderate','conversation'],seating:['Individual desks','Shared tables','Couches'],access:['everyone','students','walkin'],hours:['now','late','24'],sort:['best','seats','name']};
 for(const [key,allowed] of Object.entries(enums)) if(params.get(key)&&!allowed.includes(params.get(key)!)) throw new Error(`Invalid ${key} selection.`);
 const amenities=(params.get('amenities')||'').split(',').filter(Boolean);
 if(amenities.some(a=>!amenityLabels[a])) throw new Error('Choose a supported amenity.');
 const q=(params.get('q')||'').trim().toLowerCase().slice(0,150);
 const area=params.get('area')||'';
 const hour=campusHour(date);
 const rows:Match[]=spaces.filter(s=>(!activity||s.activities.includes(activity))&&(!q||`${s.name} ${s.building} ${s.area} ${s.floor}`.toLowerCase().includes(q))&&(!area||s.area===area)).map(s=>{
 const missed:Match['missed']=[]; let total=0;
 const check=(key:string,label:string,weight:number,ok:boolean)=>{total+=weight;if(!ok)missed.push({key,label,weight});};
 if(people>1) check('people',`Fits up to ${s.groupSize} together; you need ${people}`,35,s.groupSize>=people);
 if(params.get('noise'))check('noise',`Noise level: ${s.noise}`,25,s.noise===params.get('noise'));
 if(params.get('access')) {const a=params.get('access');check('access',s.reservation?'Reservation required':s.access==='students'?'Northwestern access required':'Public access',30,a==='walkin'?!s.reservation:a==='everyone'?s.access==='everyone':s.access==='students');}
 if(params.get('hours')) {const h=params.get('hours');check('hours',h==='now'?'Closed at this time':hours(s),30,h==='now'?isOpen(s,hour):h==='late'?s.close>=24:s.open===0&&s.close===24);}
 for(const a of amenities)check('amenities:'+a,`No ${amenityLabels[a].toLowerCase()}`,15,s.amenities.includes(a));
 if(params.get('seating'))check('seating',`Seating: ${s.seating.toLowerCase()}`,10,s.seating===params.get('seating'));
 if(params.get('available')==='true')check('available',`Only ${s.available} sample seats available`,20,s.available>=people);
 return {...s,missed,score:total?Math.round(100*(1-missed.reduce((n,m)=>n+m.weight,0)/total)):100};
 });
 const sort=params.get('sort')||'best';
 rows.sort((a,b)=>a.missed.length===0&&b.missed.length? -1:b.missed.length===0&&a.missed.length?1:sort==='name'?a.name.localeCompare(b.name):sort==='seats'?b.available-a.available||a.id.localeCompare(b.id):b.score-a.score||b.rank-a.rank||a.id.localeCompare(b.id));
 return {matches:rows.filter(s=>!s.missed.length),alternatives:rows.filter(s=>s.missed.length).slice(0,6),total:spaces.length};
}
export function validateSpaces(){const ids=new Set();for(const s of spaces){if(ids.has(s.id)||!s.name||s.capacity<1||s.groupSize>s.capacity||s.available>s.capacity||s.available<0||s.open<0||s.close>24||s.open>=s.close||s.activities.some(a=>!activities.some(t=>t.id===a))||s.amenities.some(a=>!amenityLabels[a])||s.noise==='quiet'&&s.activities.includes('calls'))throw new Error('Invalid space: '+s.id);ids.add(s.id);}}
validateSpaces();
