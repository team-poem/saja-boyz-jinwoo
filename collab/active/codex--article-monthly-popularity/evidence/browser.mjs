import { createRequire } from 'node:module';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { tmpdir } from 'node:os';
import assert from 'node:assert/strict';
const req = createRequire(process.cwd() + '/package.json');
const { chromium } = req('playwright-core');
const dir = await mkdtemp(tmpdir() + '/poem-views-e2e-');
const api = 'http://127.0.0.1:43821', web = 'http://127.0.0.1:43822';
let backend, frontend, browser;
const delay = ms => new Promise(r => setTimeout(r, ms));
async function ready(url) { for(let i=0;i<80;i++){try{if((await fetch(url)).ok)return;}catch{}await delay(100);}throw Error('server not ready'); }
async function stop(child){if(!child||child.exitCode!==null)return; const done=once(child,'exit');child.kill('SIGTERM');await Promise.race([done,delay(2000)]);if(child.exitCode===null)child.kill('SIGKILL');}
try {
  const raw=dir+'/raw';await mkdir(raw);
  const items=[0,1].map(i=>({title:`Local QA article ${i}`,description:'Local-only popularity validation',link:`https://example.invalid/${i}`,originallink:`https://example.invalid/${i}`,pubDate:i===0?'Sun, 25 Oct 2026 08:00:00 +0900':'Sat, 24 Oct 2026 08:00:00 +0900'}));
  const id='20261025T000000000000Z_'+'a'.repeat(32);
  await writeFile(raw+'/'+id+'.json',JSON.stringify({schema_version:1,id,collected_at:'2026-10-25T00:00:00Z',request:{query:'test',display:2,start:1,sort:'date'},response:{lastBuildDate:'now',total:2,start:1,display:2,items}}));
  backend=spawn(process.env.VIEWS_SERVER_BINARY??'/private/tmp/poem-views-server',[],{cwd:dir,env:{PATH:process.env.PATH,ADDR:'127.0.0.1:43821',NEWS_DATA_DIR:raw,NEWS_VIEWS_ALLOWED_ORIGINS:web}});
  await ready(api+'/health');
  frontend=spawn(process.execPath,[req.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port','43822'],{cwd:process.cwd(),env:{...process.env,NEWS_API_BASE_URL:api}});
  await ready(web+'/incidents');
  const popular=async()=>await (await fetch(api+'/news?sort=popular')).json();
  const initial=await popular();assert(initial.items.every(x=>x.views_30d===0));
  const target=initial.items.find(x=>x.article.title.endsWith('1')).article_id;
  browser=await chromium.launch({channel:'chrome',headless:true});
  const context=await browser.newContext();const page=await context.newPage();
  await page.goto(web+'/incidents',{waitUntil:'networkidle'});
  assert((await page.textContent('body')).includes('최근 30일 인기순'));
  assert((await popular()).items.every(x=>x.views_30d===0),'list/prefetch must not count');
  await page.locator(`a[href="/incidents/${target}"]`).first().click();
  await page.waitForResponse(r=>r.url()===api+'/news/'+target+'/views'&&r.status()===204);
  assert.equal((await popular()).items[0].views_30d,1);
  await page.reload({waitUntil:'networkidle'});
  assert.equal((await popular()).items[0].views_30d,1);
  const other=await browser.newContext();const page2=await other.newPage();
  await page2.goto(web+'/incidents/'+target,{waitUntil:'networkidle'});
  assert.equal((await popular()).items[0].views_30d,2);
  await page.goto(web+'/incidents',{waitUntil:'networkidle'});
  assert.equal(await page.locator('article a[href^="/incidents/"]').first().getAttribute('href'),'/incidents/'+target);
  await stop(backend);
  backend=spawn(process.env.VIEWS_SERVER_BINARY??'/private/tmp/poem-views-server',[],{cwd:dir,env:{PATH:process.env.PATH,ADDR:'127.0.0.1:43821',NEWS_DATA_DIR:raw,NEWS_VIEWS_ALLOWED_ORIGINS:web}});
  await ready(api+'/health');assert.equal((await popular()).items[0].views_30d,2);
  console.log(JSON.stringify({passed:true,checks:['prefetch=0','first visit=1','reload=1','second browser=2','popular list order','restart preserves 2']}));
} finally {await browser?.close();await stop(frontend);await stop(backend);await rm(dir,{recursive:true,force:true});}
