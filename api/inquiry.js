// Vercel Node.js Function — customer inquiries. No credentials in source control.
const ALLOWED_SERVICES = new Set([
  'Merchant Center Compliance Review',
  'Advanced Merchant Center Remediation',
  'Shopify Storefront Development',
  'Custom Commerce and AI',
  'Commerce Navigator membership information',
  'Commerce Accelerator membership information',
  'Done-for-you business launch'
]);
function clean(value,max=500){return typeof value==='string'?value.trim().slice(0,max):''}
function reply(res,code,body){res.statusCode=code;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');return res.end(JSON.stringify(body))}
function safeEmail(s){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)&&s.length<255}
function ready(){return Boolean(process.env.RESEND_API_KEY&&process.env.INQUIRY_TO_EMAIL&&process.env.RESEND_FROM_EMAIL)}
export default async function handler(req,res){
  if(req.method==='GET')return reply(res,200,{ready:ready()});
  if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return reply(res,405,{error:'Method not allowed'})}
  const origin=req.headers.origin;
  if(!origin)return reply(res,403,{error:'Request origin required'});
  try{
    const submitted=new URL(origin);
    const host=clean(req.headers.host,260).split(':')[0].toLowerCase();
    const extra=clean(process.env.ALLOWED_INQUIRY_ORIGINS,1500).split(',').map(s=>s.trim()).filter(Boolean);
    const permitted=new Set(['sterlingcommercesolutions.com','www.sterlingcommercesolutions.com','sterling-commerce-solutions.vercel.app',host,...extra]);
    if(submitted.protocol!=='https:'&&!['localhost','127.0.0.1'].includes(submitted.hostname))throw Error('origin');
    if(!permitted.has(submitted.hostname.toLowerCase()))throw Error('origin');
  }catch{return reply(res,403,{error:'Invalid origin'})}
  if(!ready())return reply(res,503,{error:'Online submissions are not yet enabled. Please save your inquiry brief and try again later.'});
  const rawLength=Number(req.headers['content-length']||0);
  if(rawLength>12000)return reply(res,413,{error:'Message is too large'});
  const d=req.body&&typeof req.body==='object'?req.body:{};
  if(clean(d.website_field))return reply(res,200,{ok:true}); // bot honeypot
  const name=clean(d.name,120),email=clean(d.email,254),service=clean(d.service,100),stage=clean(d.stage,120);
  const merchant=clean(d.merchant,130),budget=clean(d.budget,100),url=clean(d.url,350),goals=clean(d.goals,1500);
  if(!name||!safeEmail(email)||!ALLOWED_SERVICES.has(service)||!stage||d.consent!==true)return reply(res,400,{error:'Please complete all required fields and consent to contact.'});
  if(url){try{const parsed=new URL(url);if(!['https:','http:'].includes(parsed.protocol))throw Error('bad')}catch{return reply(res,400,{error:'Please enter a complete website URL, starting with https://.'})}}
  const lines=[
    'New Sterling Commerce Solutions inquiry',
    'Name: '+name,'Email: '+email,'Service: '+service,
    'Business stage: '+stage,'Merchant Center status: '+(merchant||'Not supplied'),
    'Budget: '+(budget||'Not supplied'),'Website: '+(url||'Not supplied'),
    'Goals: '+(goals||'Not supplied'),
    'Customer consented to inquiry contact.'
  ];
  try{
    const response=await fetch('https://api.resend.com/emails',{
      method:'POST',headers:{'Authorization':'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},
      body:JSON.stringify({
        from:process.env.RESEND_FROM_EMAIL,to:[process.env.INQUIRY_TO_EMAIL],
        reply_to:email,subject:'New SCS inquiry: '+service,
        text:lines.join('\n')
      }),
      signal:AbortSignal.timeout(10000)
    });
    if(!response.ok)return reply(res,502,{error:'We could not deliver your inquiry. Please try again later.'});
    return reply(res,200,{ok:true,message:'Your inquiry has been sent successfully.'});
  }catch{return reply(res,502,{error:'The inquiry could not be delivered. Please try again later.'})}
}
