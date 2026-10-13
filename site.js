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

/* Three anatomical hotspots anchored to the actual 1672 x 941 HD background. */
(function(){
 const hero=document.querySelector('#inicio.hero');
 if(!hero)return;
 const points=[
  {el:hero.querySelector('.hero-pain-point.shoulder'),x:1328,y:173},
  {el:hero.querySelector('.hero-pain-point.elbow'),x:1338,y:610},
  {el:hero.querySelector('.hero-pain-point.wrist'),x:915,y:704}
 ];
 if(points.some(p=>!p.el))return;
 const image=new Image();
 function reposition(){
  if(window.innerWidth<=850||!image.naturalWidth||!document.body.classList.contains('bap-has-desktop-hero')){
   points.forEach(p=>p.el.style.visibility='hidden');return;
  }
  const width=hero.clientWidth,height=hero.clientHeight;
  // Match desktop .hero:before background-size: cover and position: 68% center.
  const scale=Math.max(width/image.naturalWidth,height/image.naturalHeight);
  const imgW=image.naturalWidth*scale,imgH=image.naturalHeight*scale;
  const originX=(width-imgW)*.68,originY=(height-imgH)*.5;
  points.forEach(p=>{
   p.el.style.left=(originX+p.x*scale)+'px';
   p.el.style.top=(originY+p.y*scale)+'px';
   p.el.style.visibility='visible';
  });
 }
 image.addEventListener('load',reposition);
 image.src='assets/desktop/hero-desktop.webp';
 window.addEventListener('resize',reposition,{passive:true});
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(reposition).observe(hero);
 reposition();
})();
