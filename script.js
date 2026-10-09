const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const IM=["img/serviciofoto1.jfif", "img/serviciofoto2.jfif", "img/serviciofoto3.jpg", "img/serviciofoto4.jfif", "img/serviciofoto5.jfif", "img/serviciofoto6.jfif"];
const S=[["Reparación de techos","Goteras, filtraciones y mantenimiento general.",["Goteras","Revisión","Mantenimiento"],"M3 12L12 4l9 8M6 11v9h12v-9"],
["Zinguería a medida","Piezas fabricadas según las medidas de cada obra.",["Cenefas","Cumbreras","Babetas"],"M4 18L10 6h10L14 18zM10 6v3"],
["Trabajos en chapa","Fabricación y colocación en chapa galvanizada, color y sinusoidal.",["Galvanizada","Color","Sinusoidal"],"M3 15q3-6 6 0t6 0 6 0M3 20q3-6 6 0t6 0 6 0"],
["Canaletas y desagües","Canaletas a medida con tapas, cuellos, remates y conexiones.",["Tapas","Cuellos","Remates"],"M3 8h18v4a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4zM18 16v5"],
["Construcción de techos","Colocación de cubiertas y zinguería perimetral en obras nuevas.",["Cubiertas","Perimetral","Cerramientos"],"M2 13L12 4l10 9M5 12v8h14v-8M9 20v-5h6v5"],
["Fabricación especial","Gabinetes, protecciones y piezas personalizadas en chapa.",["Gabinetes","Protecciones","A pedido"],"M5 5h14v14H5zM9 9h6v6H9z"]];
$('#sg').innerHTML=S.map((s,i)=>`<article class="sc rv d${i%3}"><div class="ph"><svg viewBox="0 0 24 24"><path d="${s[3]}"/></svg><img src="${IM[i]}" alt="${s[0]}" loading="lazy"></div><div class="sb"><h3>${s[0]}</h3><p>${s[1]}</p><ul>${s[2].map(x=>`<li>${x}</li>`).join('')}</ul><a href="#contacto" data-svc="${s[0]}">Consultar por este servicio</a></div></article>`).join('');
$('#abimg').src=IM[0];
$('#gal').innerHTML=[4,0,1,3,5,2].map(i=>`<button class="rv" data-i="${i}" aria-label="Ampliar foto"><img src="${IM[i]}" alt="Trabajo de zinguería y techos Manutech" loading="lazy"></button>`).join('');
const GO=[4,0,1,3,5,2],lb=$('#lbx'),li=lb.querySelector('img');let gi=0,lastBtn=null;
function show(i){gi=(i+GO.length)%GO.length;li.src=IM[GO[gi]]}
function openLb(i,btn){lastBtn=btn;show(i);lb.classList.add('o');document.body.style.overflow='hidden';lb.querySelector('.x').focus()}
function closeLb(){lb.classList.remove('o');document.body.style.overflow='';if(lastBtn)lastBtn.focus()}
$$('#gal button').forEach((b,i)=>b.onclick=()=>openLb(i,b));
lb.querySelector('.x').onclick=closeLb;lb.querySelector('.pv').onclick=()=>show(gi-1);lb.querySelector('.nx').onclick=()=>show(gi+1);
lb.addEventListener('click',e=>{if(e.target===lb)closeLb()});
addEventListener('keydown',e=>{if(!lb.classList.contains('o'))return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')show(gi-1);if(e.key==='ArrowRight')show(gi+1)});
let tx=0;lb.addEventListener('touchstart',e=>tx=e.changedTouches[0].clientX,{passive:true});
lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)show(gi+(d<0?1:-1))},{passive:true});
// tilt
if(matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches)$$('.sc').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-6px)`});c.addEventListener('mouseleave',()=>c.style.transform='')});
// header/progress/reveal/counters
const hd=$('#hd'),pb=$('#pb');addEventListener('scroll',()=>{hd.classList.toggle('s',scrollY>40);pb.style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+'%'},{passive:true});
const mt=$('#mt'),lk=$('#lk');
function menu(o){lk.classList.toggle('o',o);mt.setAttribute('aria-expanded',o);mt.setAttribute('aria-label',o?'Cerrar menú':'Abrir menú')}
mt.onclick=()=>menu(!lk.classList.contains('o'));$$('#lk a').forEach(a=>a.onclick=()=>menu(false));
addEventListener('keydown',e=>{if(e.key==='Escape')menu(false)});
document.addEventListener('click',e=>{if(!e.target.closest('header'))menu(false)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('on');setTimeout(()=>e.target.style.transitionDelay='0s',1300);e.target.querySelectorAll('[data-n]').forEach(cnt);io.unobserve(e.target)}),{threshold:.15});$$('.rv').forEach(e=>io.observe(e));
function cnt(b){const n=+b.dataset.n,s=b.dataset.s||'',t0=performance.now();(function f(t){const p=Math.min((t-t0)/1400,1);b.textContent=Math.round(n*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(f)})(t0)}
// rain canvas (se pausa cuando el hero no se ve)
(function(){const c=$('#rain'),x=c.getContext('2d');let w,h,d=[],run=false,raf,rt;
function rs(){w=c.width=c.offsetWidth;h=c.height=c.offsetHeight;d=Array.from({length:Math.min(140,w/9)},()=>({x:Math.random()*w,y:Math.random()*h,l:10+Math.random()*16,v:9+Math.random()*9}))}
rs();addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(rs,150)});
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
function f(){x.clearRect(0,0,w,h);x.strokeStyle='rgba(120,210,240,.5)';x.lineWidth=1.4;d.forEach(p=>{x.beginPath();x.moveTo(p.x,p.y);x.lineTo(p.x-2,p.y+p.l);x.stroke();p.y+=p.v;p.x-=.6;if(p.y>h){p.y=-20;p.x=Math.random()*w}});raf=requestAnimationFrame(f)}
new IntersectionObserver(es=>{if(es[0].isIntersecting){if(!run){run=true;f()}}else{run=false;cancelAnimationFrame(raf)}}).observe(c)})();
// before/after
$('#rg').oninput=e=>{const v=e.target.value;$('.af').style.clipPath=`inset(0 0 0 ${v}%)`;$('#hdl').style.left=v+'%'};
// chapa
const T=[["Chapa galvanizada: resistente a la corrosión y de larga vida útil para cubiertas y zinguería.",["#C7CED6","#9AA4AF","#E4E8EC"],0],["Chapa color: prolija, con terminación uniforme y variedad de tonos para combinar con tu obra.",["#B23A2E","#2F6DB5","#3A6B4B","#2B2B2E"],0],["Chapa sinusoidal: perfil ondulado clásico, ideal para techos de galpones, patios y cerramientos.",["#C7CED6","#B23A2E","#2F6DB5"],1]];
let ti=0,ci=0;function sheet(){const c=T[ti][2],col=T[ti][1][ci]||T[ti][1][0];const r=T[ti][2]?`repeating-linear-gradient(90deg,${col},color-mix(in srgb,${col} 60%,#000) 18px,${col} 36px)`:`repeating-linear-gradient(90deg,${col} 0 60px,color-mix(in srgb,${col} 70%,#000) 60px 63px)`;$('#sheet').style.background=`linear-gradient(115deg,rgba(255,255,255,.35),transparent 40%,rgba(0,0,0,.25)),${r}`;$('#ctx').textContent=T[ti][0]}
function sw(){$('#sw').innerHTML=T[ti][1].map((c,i)=>`<i style="background:${c}" class="${i===ci?'a':''}" data-i="${i}"></i>`).join('');$$('#sw i').forEach(e=>e.onclick=()=>{ci=+e.dataset.i;sw();sheet()})}
$$('#tabs button').forEach(b=>b.onclick=()=>{ti=+b.dataset.t;ci=0;$$('#tabs button').forEach(x=>x.classList.toggle('a',x===b));sw();sheet()});sw();sheet();
// quote -> whatsapp
let svc='Gotera';$$('#chips button').forEach(b=>b.onclick=()=>{svc=b.textContent;$$('#chips button').forEach(x=>x.classList.toggle('a',x===b))});
const MAP={'Reparación de techos':'Gotera','Zinguería a medida':'Chapa a medida','Trabajos en chapa':'Chapa a medida','Canaletas y desagües':'Canaletas','Construcción de techos':'Techo nuevo','Fabricación especial':'Otro'};
$$('[data-svc]').forEach(a=>a.onclick=()=>{const m=$$('#chips button').find(b=>b.textContent===MAP[a.dataset.svc]);if(m)m.click()});
$('#send').onclick=()=>{const n=$('#nm').value.trim(),m=$('#ms').value.trim();const t=`Hola Manutech, soy ${n||'un cliente'}. Necesito presupuesto por: ${svc}.${m?' '+m:''}`;window.open('https://wa.me/5491140995957?text='+encodeURIComponent(t),'_blank','noopener')};
// barra de servicios: se duplica para que el bucle nunca deje huecos en pantallas anchas
const tr=$('.strip div');tr.innerHTML+=tr.innerHTML;
// menú: marca la sección visible
const links=$$('#lk a'),secs=links.map(a=>$(a.getAttribute('href'))).filter(Boolean);
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>{const on=a.getAttribute('href')==='#'+e.target.id;a.classList.toggle('a',on);on?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current')})}),{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(s=>spy.observe(s));
$('#yr').textContent=new Date().getFullYear();
