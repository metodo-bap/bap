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

/* Image-space placement: pain markers follow the actual HD hero crop at any desktop resolution. */
(function(){
 const hero=document.querySelector('#inicio.hero');
 if(!hero)return;
 const shoulder=hero.querySelector('.hero-pain-point.shoulder');
 const elbow=hero.querySelector('.hero-pain-point.elbow');
 if(!shoulder||!elbow)return;
 const img=new Image();
 const coords=[{el:shoulder,x:.805,y:.232},{el:elbow,x:.813,y:.704}];
 function position(){
  if(window.innerWidth<=850||!img.naturalWidth||!document.body.classList.contains('bap-has-desktop-hero')){shoulder.style.visibility='hidden';elbow.style.visibility='hidden';return}
  const width=hero.clientWidth,height=hero.clientHeight;
  const scale=Math.max(width/img.naturalWidth,height/img.naturalHeight);
  const renderedWidth=img.naturalWidth*scale,renderedHeight=img.naturalHeight*scale;
  const left=(width-renderedWidth)*.68,top=(height-renderedHeight)*.5;
  coords.forEach(({el,x,y})=>{el.style.left=(left+renderedWidth*x)+'px';el.style.top=(top+renderedHeight*y)+'px';el.style.visibility='visible'});
 }
 img.addEventListener('load',()=>{document.body.classList.add('bap-has-desktop-hero');position()});
 img.src='assets/desktop/hero-desktop.webp';
 window.addEventListener('resize',position,{passive:true});
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(position).observe(hero);
 position();
})();
