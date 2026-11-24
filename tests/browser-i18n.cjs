const {chromium}=require(process.env.OPN_PLAYWRIGHT_MODULE || 'playwright-core');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const languages=['es','en','pt','fr','de','ru','zh-CN'];
fs.mkdirSync('.qa', {recursive:true});
(async()=>{
 const executablePath=process.env.OPN_BROWSER_PATH || (process.platform==='win32' ? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' : undefined);
 const browser=await chromium.launch({executablePath,headless:true});
 const errors=[];let checks=0;
 try{
  const context=await browser.newContext({locale:'es-ES'});
  await context.route('http://opn.test/**',async route=>{
   let name=new URL(route.request().url()).pathname;if(name.endsWith('/'))name+='index.html';const file=path.join(process.cwd(),name);
   const type={'.js':'text/javascript','.html':'text/html','.css':'text/css','.svg':'image/svg+xml','.png':'image/png'}[path.extname(file)];
   await route.fulfill({status:fs.existsSync(file)?200:404,contentType:type||'text/plain',body:fs.existsSync(file)?fs.readFileSync(file):''});
  });
  await context.addInitScript(()=>{
   window.copied=[];Object.defineProperty(navigator,'clipboard',{value:{writeText:async value=>window.copied.push(value)}});
   Object.defineProperty(navigator,'share',{value:async value=>window.shared=value});
   Object.defineProperty(window,'isSecureContext',{value:true});
  });
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://opn.test/');
  assert.equal(await page.locator('html').getAttribute('lang'),'es');checks++;
  assert.equal(await page.locator('.language-flag').count(),7);checks++;
  await page.locator('[data-category="farmingBot"]').click();
  await page.locator('[data-category="wallhack"]').click();
  await page.locator('#botProfileUrl').fill('https://steamcommunity.com/id/opn-test/?x=1#test');
  await page.locator('#addBotToDailyList').click();
  for(const language of languages){
   await page.locator(`[data-language="${language}"]`).click();
   assert(await page.evaluate(()=>document.querySelector('.copy-button span').textContent===t('Copy')&&!toast.classList.contains('show')));checks++;
   const result=await page.evaluate(()=>{
    const categories=Array.from(selectedCategories);
    const expected=orderedCategories(categories).map(k=>templates[k].report).join(' ')+' '+t('Please review the available account, communication and match data as relevant.');
    const before=selectedCategories.size;
    const individual=Object.keys(templates).every(key=>{
     selectedCategories.clear();selectedCategories.add(key);updateOutput();
     return reportText.value===templates[key].report+' '+t('Please review the available account, communication and match data as relevant.')&&commentText.value.startsWith(templates[key].comment);
    });
    selectedCategories.clear();categories.forEach(k=>selectedCategories.add(k));updateOutput();
    openCategoryInfo('softAim');
    const info=categoryInfoDefinition.textContent===categoryHelp.softAim.definition&&categoryInfoTitle.textContent===categoryHelp.softAim.name;
    categoryInfoDialog.close();
    return {language:document.documentElement.lang,output:reportText.value===expected,individual,info,count:before,queue:botDailyEntries.length,body:botEmailBody.value,bodyExpected:botEmailBody.value.includes(templates.farmingBot.report)&&botEmailBody.value.includes(templates.wallhack.report),recipient:document.querySelector('#botEmailRecipient').value,subject:document.querySelector('#botEmailSubject').value,share:steamShareText.value,stored:localStorage.getItem('opnLanguage'),flags:[...document.querySelectorAll('.language-flag img')].every(img=>img.complete&&img.naturalWidth>0),logo:document.querySelector('.brand img').naturalWidth};
   });
   assert.equal(result.language,language);assert(result.output&&result.individual&&result.info&&result.bodyExpected&&result.flags&&result.logo>0);assert.equal(result.count,2);assert.equal(result.queue,1);assert.equal(result.recipient,'cs2team@valvesoftware.com');assert.equal(result.subject,'boosting report');assert(result.share.endsWith('https://gofiodesign.eu/OpenPlayNetwork/'));assert.equal(result.stored,language);checks+=10;
   await page.locator('[data-copy-button="reportText"]').click();
   assert.equal(await page.evaluate(()=>window.copied.at(-1)),await page.locator('#reportText').inputValue());checks++;
  }
  await page.locator('[data-filter="selected"]').click();
  await page.locator('[data-language="de"]').click();
  assert.equal(await page.locator('.category-item:visible').count(),2);checks++;
  await page.locator('#botProfileUrl').fill('https://steamcommunity.com/id/opn-test/');await page.locator('#addBotToDailyList').click();
  assert.equal(await page.locator('.bot-daily-entry').count(),1);checks++;
  await page.reload();assert.equal(await page.locator('.bot-daily-entry').count(),1);assert.equal(await page.locator('html').getAttribute('lang'),'de');checks+=2;
  await page.locator('[data-category="farmingBot"]').click();
  await page.locator('#botProfileUrl').fill('https://example.com/id/test');assert(await page.locator('#addBotToDailyList').isDisabled());checks++;
  await page.locator('#copyBotEmail').click();assert((await page.evaluate(()=>window.copied.at(-1))).includes('https://steamcommunity.com/id/opn-test/'));checks++;
  for(const width of [360,768,1280]){
   await page.setViewportSize({width,height:900});
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));checks++;
   await page.screenshot({path:`.qa/report-${width}.png`,fullPage:true});
  }
  await page.locator('.tool-link').click();await page.waitForLoadState('load');assert.equal(await page.locator('html').getAttribute('lang'),'de');checks++;
  for(const language of languages){
   await page.locator(`[data-language="${language}"]`).click();
   assert(await page.evaluate(()=>copyKudosButton.querySelector('span').textContent===t('Copy')&&!toast.classList.contains('show')));checks++;
   const result=await page.evaluate(()=>{
    const tiers=['top','positive','neutral','zero','negative','extreme'];
    const count=Object.keys(qualities).length;
    const outputs=tiers.every(tier=>{
     selectedRatings.clear();Object.keys(qualities).forEach(id=>selectedRatings.set(id,tier));updateOutput();
     return Object.values(qualities).every(q=>kudosText.value.includes(q.ratings[tier].comment))&&document.querySelectorAll('.rating-button.active').length===count;
    });
    selectedRatings.clear();selectedRatings.set('attitude','top');selectedRatings.set('participation','zero');updateOutput();applyFilter('selected');
    openInfo('participation');
    const info=infoDefinition.textContent===qualities.participation.definition&&infoExample.textContent.includes(qualities.participation.ratings.zero.label);
    infoDialog.close();
    return {language:document.documentElement.lang,count,outputs,info,selected:selectedRatings.size,visible:[...document.querySelectorAll('.rating-card')].filter(e=>!e.hidden).length,comment:kudosText.value,promotion:kudosText.value.includes(groupUrl)};
   });
   assert.equal(result.language,language);assert.equal(result.count,19);assert(result.outputs&&result.info&&result.promotion);assert.equal(result.selected,2);assert.equal(result.visible,2);checks+=5;
   await page.locator('#copyKudos').click();assert.equal(await page.evaluate(()=>window.copied.at(-1)),result.comment);checks++;
  }
  await page.locator('#includePromotion').uncheck();assert(!(await page.locator('#kudosText').inputValue()).includes('steamcommunity.com/groups/'));checks++;
  await page.locator('[data-language="fr"]').click();assert.equal(await page.locator('.rating-card:visible').count(),2);assert(!(await page.locator('#kudosText').inputValue()).includes('steamcommunity.com/groups/'));checks+=2;
  await page.locator('[data-filter="all"]').click();
  for(const width of [360,768,1280]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));checks++;await page.screenshot({path:`.qa/kudos-${width}.png`,fullPage:true});}
  await page.locator('#clearSelection').click();assert.equal(await page.locator('#kudosText').inputValue(),'');checks++;
  await page.goto('http://opn.test/');assert.equal(await page.locator('html').getAttribute('lang'),'fr');checks++;
  const detect=await page.evaluate(()=>['es-MX','en-GB','pt-BR','fr-CA','de-DE','ru-RU','zh','zh-CN','zh-SG','zh-Hans','zh-Hans-CN','it-IT'].map(opnI18n.resolveLanguage));
  assert.deepEqual(detect,['es','en','pt','fr','de','ru','zh-CN','zh-CN','zh-CN','zh-CN','zh-CN',null]);checks++;
  await page.evaluate(()=>{localStorage.clear();Object.defineProperty(navigator,'languages',{value:['it-IT'],configurable:true});});
  await context.addInitScript(()=>{Object.defineProperty(navigator,'languages',{value:['it-IT'],configurable:true});});
  await page.reload();assert.equal(await page.locator('html').getAttribute('lang'),'es');checks++;
  await page.route('**/i18n.js*',route=>route.fulfill({contentType:'text/javascript',body:`Object.defineProperty(Storage.prototype,'getItem',{value(){throw Error('storage disabled')}});Object.defineProperty(Storage.prototype,'setItem',{value(){throw Error('storage disabled')}});Object.defineProperty(navigator,'languages',{value:['fr-CA']});\n`+fs.readFileSync('i18n.js','utf8')}));
  await page.reload();assert.equal(await page.locator('html').getAttribute('lang'),'fr');await page.locator('[data-language="ru"]').click();assert.equal(await page.locator('html').getAttribute('lang'),'ru');checks+=2;
  assert.deepEqual(errors,[]);checks++;
  console.log(JSON.stringify({checks,languages,reportCategories:18,kudosQualities:19,kudosRatings:6,viewports:[360,768,1280],pageErrors:errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
