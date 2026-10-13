const b=document.getElementById('menub'),d=document.getElementById('drawer');
function closeMenu(){if(!b||!d)return;d.classList.remove('open');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Abrir menu');b.textContent='☰'}
if(b&&d){b.setAttribute('aria-controls','drawer');b.addEventListener('click',()=>{const state=d.classList.toggle('open');b.setAttribute('aria-expanded',String(state));b.setAttribute('aria-label',state?'Fechar menu':'Abrir menu');b.textContent=state?'×':'☰'});d.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});document.addEventListener('click',e=>{if(d.classList.contains('open')&&!d.contains(e.target)&&!b.contains(e.target))closeMenu()})}
const desc={Ombros:'Consciência dos movimentos durante a prática musical.',Costas:'Postura, períodos de estudo e cuidado com sobrecargas.',Punhos:'Atenção à técnica e aos movimentos repetitivos.'};
document.querySelectorAll('[data-area]').forEach(p=>{p.setAttribute('aria-pressed',String(p.classList.contains('active')));p.addEventListener('click',()=>{document.querySelectorAll('[data-area]').forEach(q=>{q.classList.remove('active');q.setAttribute('aria-pressed','false')});p.classList.add('active');p.setAttribute('aria-pressed','true');const title=document.getElementById('areatitle'),description=document.getElementById('areadesc');if(title)title.textContent=p.dataset.area.toUpperCase();if(description)description.textContent=desc[p.dataset.area]||''})});
/* Progressive desktop assets: existing imagery remains unless the new files load. */
(function(){
  const assets={hero:'assets/desktop/hero-desktop.webp',course:'assets/desktop/curso-desktop.webp'};
  const test=(url,ok)=>{const img=new Image();img.onload=ok;img.src=url};
  test(assets.hero,()=>document.body.classList.add('bap-has-desktop-hero'));
  test(assets.course,()=>document.body.classList.add('bap-has-desktop-course'));
  const panel=document.querySelector('.bodywrap .detail');
  if(!panel)return;
  const preview=document.createElement('img');
  preview.className='bap-area-preview';
  preview.alt='Ilustração de performance corporal para bateristas';
  preview.hidden=true;
  panel.appendChild(preview);
  const areaImage={Ombros:'assets/desktop/ombros.webp',Costas:'assets/desktop/coluna.webp',Punhos:'assets/desktop/punhos.webp'};
  function showArea(name){
    const src=areaImage[name];if(!src)return;
    const image=new Image();
    image.onload=()=>{if(document.querySelector('.point.active')?.dataset.area===name){preview.src=src;preview.alt='Ilustração de '+name.toLowerCase()+' na prática da bateria';preview.hidden=false}};
    image.src=src;
  }
  document.querySelectorAll('.bodywrap [data-area]').forEach(b=>b.addEventListener('click',()=>showArea(b.dataset.area)));
  showArea(document.querySelector('.bodywrap .point.active')?.dataset.area||'Ombros');
})();

(function(){const img=new Image();img.onload=()=>document.body.classList.add('bap-has-tiago-banner');img.src='assets/desktop/tiago-banner.webp'})();

(function(){const dock=document.querySelector('.purchase-dock');const hero=document.querySelector('.hero');if(!dock||!hero)return;const update=()=>{const visible=window.innerWidth<=850&&hero.getBoundingClientRect().bottom<120;dock.classList.toggle('visible',visible)};window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update()})();

/* Accessible disclosure interaction for testimonials: click, tap, Enter, Space and Escape */
(function(){
 const cards=[...document.querySelectorAll('.quote-card')];
 const set=(card,on)=>{card.classList.toggle('is-open',on);card.setAttribute('aria-expanded',String(on))};
 cards.forEach(card=>{
   card.addEventListener('click',()=>{const open=card.classList.contains('is-open');cards.forEach(c=>set(c,false));set(card,!open)});
   card.addEventListener('keydown',e=>{
     if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click()}
     if(e.key==='Escape'){set(card,false);card.blur()}
   });
   card.addEventListener('blur',()=>{if(!card.matches(':hover'))set(card,false)});
 });
})();

/* Calibrated indicators: source pixels of the approved 1672x941 hero image.
   Two printed targets are (1328,173) shoulder and (1338,609) elbow.
   Wrist is anatomically placed at the left hand joint (906,699). */
(function(){
 const hero=document.getElementById('inicio');
 if(!hero)return;
 const indicators=[
  {el:hero.querySelector('.hero-pain-point.shoulder'),x:1353,y:177},
  {el:hero.querySelector('.hero-pain-point.elbow'),x:1363,y:614},
  {el:hero.querySelector('.hero-pain-point.wrist'),x:906,y:699}
 ];
 if(indicators.some(p=>!p.el))return;
 const src=new Image();
 const place=()=>{
  const desktop=window.matchMedia('(min-width:851px)').matches;
  if(!desktop||!src.naturalWidth||!document.body.classList.contains('bap-has-desktop-hero')){
   indicators.forEach(p=>p.el.style.visibility='hidden');return;
  }
  const w=hero.clientWidth,h=hero.clientHeight;
  const factor=Math.max(w/src.naturalWidth,h/src.naturalHeight);
  const originX=(w-src.naturalWidth*factor)*.68;
  const originY=(h-src.naturalHeight*factor)*.5;
  for(const p of indicators){
   p.el.style.left=Math.round(originX+p.x*factor)+'px';
   p.el.style.top=Math.round(originY+p.y*factor)+'px';
   p.el.style.visibility='visible';
  }
 };
 src.onload=()=>{document.body.classList.add('bap-has-desktop-hero');place()};
 src.onerror=()=>indicators.forEach(p=>p.el.style.visibility='hidden');
 src.src='assets/desktop/hero-desktop.webp';
 window.addEventListener('resize',place,{passive:true});
 if('ResizeObserver' in window)new ResizeObserver(place).observe(hero);
 place();
})();

/* Home second fold — accessible interactive cinematic region navigation */
(function(){
 const section=document.getElementById('corpo');
 if(!section||!section.classList.contains('body-experience'))return;
 const tabs=[...section.querySelectorAll('.region-tab')];
 const names=['ombros','costas','punhos'];
 const descriptions={
  ombros:'Observe a participação dos ombros e dos braços nos movimentos repetitivos ao tocar.',
  costas:'Conheça a relação entre postura, permanência no instrumento e conforto durante a prática.',
  punhos:'Explore a importância dos punhos e antebraços nos gestos técnicos e na repetição dos movimentos.'
 };
 const title=section.querySelector('#areatitle');
 const description=section.querySelector('#areadesc');
 const count=section.querySelector('#region-count');
 let active=0;
 function select(index,focus=false){
  active=(index+names.length)%names.length;
  const selected=names[active];
  section.classList.remove(...names.map(n=>'area-'+n));
  section.classList.add('area-'+selected);
  tabs.forEach((tab,i)=>{tab.classList.toggle('active',i===active);tab.setAttribute('aria-pressed',String(i===active))});
  if(title)title.textContent=selected==='costas'?'COLUNA':selected.toUpperCase();
  if(description)description.textContent=descriptions[selected];
  if(count)count.textContent=String(active+1).padStart(2,'0')+' / 03';
  if(focus)tabs[active].focus();
 }
 tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>select(i));
  tab.addEventListener('keydown',event=>{
   if(event.key==='ArrowRight'||event.key==='ArrowDown'){event.preventDefault();select(i+1,true)}
   if(event.key==='ArrowLeft'||event.key==='ArrowUp'){event.preventDefault();select(i-1,true)}
  });
 });
 section.querySelector('#region-prev')?.addEventListener('click',()=>select(active-1));
 section.querySelector('#region-next')?.addEventListener('click',()=>select(active+1));
 select(0);
})();

/* Editorial curriculum explorer: updates image and practical description */
(function(){
 const root=document.getElementById('preparacao');
 if(!root?.classList.contains('learning-lab'))return;
 const items={
 aquecimento:{title:'AQUECIMENTO',text:'Conheça fundamentos para preparar o corpo antes dos estudos, ensaios e apresentações.',image:'assets/desktop/ombros.webp'},
 postura:{title:'POSTURA E ERGONOMIA',text:'Explore a organização do instrumento e as relações entre posicionamento, movimento e conforto.',image:'assets/desktop/coluna.webp'},
 alongamento:{title:'ALONGAMENTO',text:'Entenda princípios de alongamento aplicados à rotina de quem toca bateria.',image:'assets/desktop/punhos.webp'},
 tendinite:{title:'TENDINITE E SOBRECARGAS',text:'Aprenda a reconhecer a importância dos movimentos repetitivos e das sobrecargas na prática musical.',image:'assets/desktop/ombros.webp'},
 energia:{title:'ECONOMIA DE ENERGIA',text:'Descubra como a consciência dos movimentos pode favorecer uma execução mais eficiente.',image:'assets/desktop/curso-desktop.webp'},
 relaxamento:{title:'FLEXIBILIDADE E RELAXAMENTO',text:'Conheça fundamentos de mobilidade, flexibilidade e recuperação entre sessões de prática.',image:'assets/desktop/coluna.webp'}
 };
 const buttons=[...root.querySelectorAll('.learning-topic')];
 const visual=root.querySelector('.learning-photo');
 const visualTitle=root.querySelector('#learning-photo-title');
 const label=root.querySelector('#learning-title');
 const desc=root.querySelector('#learning-desc');
 const count=root.querySelector('#learning-index');
 let current=0;
 function select(index,focus=false){
  current=(index+buttons.length)%buttons.length;
  const tab=buttons[current],item=items[tab.dataset.topic];
  buttons.forEach((b,i)=>{b.classList.toggle('active',i===current);b.setAttribute('aria-pressed',String(i===current))});
  visual.style.backgroundImage="linear-gradient(0deg,#051018ed,#06101800 48%,#06101836),url('"+item.image+"')";
  visual.setAttribute('aria-label','Ilustração do programa: '+item.title.toLowerCase());
  visualTitle.textContent=item.title;label.textContent=item.title;desc.textContent=item.text;
  count.textContent=String(current+1).padStart(2,'0')+' / 06';
  if(focus)tab.focus();
 }
 buttons.forEach((b,i)=>{b.addEventListener('click',()=>select(i));b.addEventListener('keydown',e=>{
  if(e.key==='ArrowDown'||e.key==='ArrowRight'){e.preventDefault();select(i+1,true)}
  if(e.key==='ArrowUp'||e.key==='ArrowLeft'){e.preventDefault();select(i-1,true)}
 })});
 select(0);
})();

/* Progressive image activation. Keep approved existing visual until each WebP exists. */
(function(){
 const urls=['aquecimento','postura','coluna','alongamento','polegar','ergonomia'];
 const cards=document.querySelectorAll('.bap-video-grid .bap-video-card');
 cards.forEach((card,i)=>{
  if(!urls[i])return;
  const image=new Image();
  image.onload=()=>card.classList.add('bap-video-image-ready');
  image.src='assets/videos/'+urls[i]+'.webp';
 });
})();

/* Hover parallax restricted to Tiago's approved banner, never the section background. */
(function(){
 const card=document.querySelector('#sobre-tiago .tiago-feature-card');
 if(!card||!window.matchMedia('(hover:hover) and (pointer:fine) and (min-width:851px) and (prefers-reduced-motion:no-preference)').matches)return;
 let frame=0;
 card.addEventListener('pointermove',event=>{
  const rect=card.getBoundingClientRect();
  if(!rect.width||!rect.height)return;
  const x=Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width));
  const y=Math.max(0,Math.min(1,(event.clientY-rect.top)/rect.height));
  if(frame)cancelAnimationFrame(frame);
  frame=requestAnimationFrame(()=>{
   card.style.setProperty('--art-x',((.5-x)*14).toFixed(1)+'px');
   card.style.setProperty('--art-y',((.5-y)*9).toFixed(1)+'px');
   card.style.setProperty('--light-x',(x*100).toFixed(1)+'%');
   card.style.setProperty('--light-y',(y*100).toFixed(1)+'%');
  });
 },{passive:true});
 card.addEventListener('pointerleave',()=>{
  if(frame)cancelAnimationFrame(frame);
  card.style.setProperty('--art-x','0px');
  card.style.setProperty('--art-y','0px');
 });
})();

/* Author biography: restrained motion on the dual portrait only. */
(function(){
 const card=document.querySelector('.author-dual-frame');
 if(!card||!window.matchMedia('(hover:hover) and (pointer:fine) and (min-width:851px) and (prefers-reduced-motion:no-preference)').matches)return;
 let frame=0;
 card.addEventListener('pointermove',event=>{
  const r=card.getBoundingClientRect(),x=(event.clientX-r.left)/r.width,y=(event.clientY-r.top)/r.height;
  if(frame)cancelAnimationFrame(frame);
  frame=requestAnimationFrame(()=>{
   card.style.setProperty('--author-x',((.5-x)*12).toFixed(1)+'px');
   card.style.setProperty('--author-y',((.5-y)*8).toFixed(1)+'px');
   card.style.setProperty('--author-lx',Math.round(x*100)+'%');
   card.style.setProperty('--author-ly',Math.round(y*100)+'%');
  });
 },{passive:true});
 card.addEventListener('pointerleave',()=>{
  if(frame)cancelAnimationFrame(frame);
  card.style.setProperty('--author-x','0px');card.style.setProperty('--author-y','0px');
 });
})();
