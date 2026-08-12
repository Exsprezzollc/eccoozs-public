import type { ReactNode } from "react";

const patch = String.raw`
(function(){
  function ready(fn){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn); else fn(); }
  ready(function(){
    /* Preserve the approved page; only replace the specific stale items. */
    var logo=document.querySelector('nav .nav-logo');
    if(logo){
      logo.innerHTML='<img src="/icon.svg" alt="Eccoozs E mark" style="width:34px;height:34px;object-fit:contain;flex:0 0 auto"><span style="display:flex;flex-direction:column;line-height:1"><strong style="font-family:DM Sans,sans-serif;font-size:1.08rem;letter-spacing:.07em;color:#fff;text-transform:uppercase">ECCOOZS</strong><small style="margin-top:4px;font-size:.55rem;letter-spacing:.095em;color:rgba(255,255,255,.4);text-transform:uppercase">Culture · Conversation · Community</small></span>';
      logo.setAttribute('href','/welcome');
      logo.style.minWidth='210px';
    }

    /* If an older/public drop-in contains Pricing, put the real signup section in its place. */
    var pricing=document.querySelector('#pricing');
    var download=document.querySelector('#download');
    if(pricing && download){
      pricing.replaceWith(download);
    }else if(pricing){
      pricing.remove();
    }
    document.querySelectorAll('nav a').forEach(function(a){
      var txt=(a.textContent||'').trim();
      if(txt==='Pricing'){
        a.textContent='Join';
        a.setAttribute('href','#download');
      }
    });

    /* Restore/keep Ecco and House of Eccoozs terminology everywhere on Welcome. */
    document.querySelectorAll('.mtrack .mi').forEach(function(el){
      var t=(el.textContent||'').trim();
      if(t==='Live Streaming') el.innerHTML='<span aria-hidden="true">↪</span>Ecco';
      if(t==='Eccoozs Shop') el.innerHTML='<span aria-hidden="true">▢</span>House of Eccoozs';
    });

    document.querySelectorAll('#features .fc').forEach(function(card){
      var title=card.querySelector('.ft');
      var copy=card.querySelector('.fd');
      if(!title) return;
      if(title.textContent.trim()==='Live Streaming'){
        title.textContent='Ecco';
        if(copy) copy.textContent='Where posts become conversations. Quote eccos, picture eccos, and video eccos — organized for context, not chaos.';
      }
      if(title.textContent.trim()==='Eccoozs Shop'){
        title.textContent='House of Eccoozs';
        if(copy) copy.textContent='Shop House of Eccoozs merch and spread the culture. Members earn commission promoting the brand — more ways to earn coming soon.';
        card.setAttribute('role','link'); card.setAttribute('tabindex','0'); card.style.cursor='pointer';
        var go=function(){ location.href='/house-of-eccoozs'; };
        card.addEventListener('click',go);
        card.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});
        if(!card.querySelector('.house-soon')){ var s=document.createElement('div'); s.className='house-soon'; s.textContent='Coming Soon →'; s.style.cssText='margin-top:14px;color:#1a3ef5;font-size:.77rem;font-weight:800'; card.appendChild(s); }
      }
    });

    /* Add Learning Apps to existing navigation without changing the rest of the nav. */
    var nav=document.querySelector('nav .nav-links');
    if(nav && !nav.querySelector('[data-learning-link]')){
      var li=document.createElement('li'); li.setAttribute('data-learning-link','1'); li.innerHTML='<a href="/learning">Learning Apps</a>';
      var legacy=Array.from(nav.children).find(function(x){ return (x.textContent||'').trim()==='Legacy'; });
      if(legacy) nav.insertBefore(li,legacy); else nav.appendChild(li);
    }

    /* House of Eccoozs links always go to a real Coming Soon page. */
    document.querySelectorAll('a').forEach(function(a){
      var txt=(a.textContent||'').trim().toLowerCase();
      var href=a.getAttribute('href')||'';
      if(txt.indexOf('house of eccoozs')>=0 || href==='https://eccoozs.com/shop'){
        a.setAttribute('href','/house-of-eccoozs'); a.removeAttribute('target'); a.removeAttribute('rel');
      }
    });

    /* Repair known placeholder links and keep every public link on a real destination. */
    document.querySelectorAll('a').forEach(function(a){
      var txt=(a.textContent||'').trim();
      var href=a.getAttribute('href')||'';

      if(txt==='Home' && href==='#') a.setAttribute('href','/welcome');
      if(txt==='Log In' && href==='#'){
        a.setAttribute('href','#download');
        a.setAttribute('title','ECCOOZS login opens at launch — join Early Access');
      }
      if(txt==='Soundrooms' && href==='#') a.setAttribute('href','#features');
      if(txt==='Culture' && href==='#') a.setAttribute('href','#lifestyle');
      if((txt==='Partnerships' || txt==='Media Kit' || txt==='Contact Us' || txt==='Community Support') && href==='#') a.setAttribute('href','/welcome/support');

      if(txt==='Terms of Service' || txt==='Terms') a.setAttribute('href','/welcome/terms');
      if(txt==='Privacy Policy' || txt==='Privacy') a.setAttribute('href','/welcome/privacy');
      if(txt==='Code of Conduct' || txt==='Community Guidelines' || txt==='Policies') a.setAttribute('href','/welcome/conduct');
      if(txt==='Community Support' || txt==='Contact Us') a.setAttribute('href','/welcome/support');

      /* No inert # links are left behind. */
      if((a.getAttribute('href')||'')==='#') a.setAttribute('href','/welcome');
    });

    /* Keep approved Inventors & Innovators art; insert only if an older page somehow omitted it. */
    var history=document.querySelector('#history');
    if(history && !history.querySelector('.inventors-wrap')){
      var inner=history.querySelector('.hist-grid');
      if(inner){
        var wrap=document.createElement('div'); wrap.className='inventors-wrap rv';
        wrap.innerHTML='<img src="/welcome-images/landing-16-v3.png?v=16v3" alt="FBA Inventors and Innovators — Black American scientists, engineers and pioneers"><div class="inventors-overlay"><span class="inventors-title">Inventors &amp; Innovators</span><span class="inventors-caption">FBA scientists, engineers, and pioneers whose brilliance shaped the modern world — often uncredited, never forgotten</span></div>';
        inner.insertAdjacentElement('afterend',wrap);
      }
    }
  });
})();
`;

export default function WelcomeLayout({children}:{children:ReactNode}){
  return <>{children}<script dangerouslySetInnerHTML={{__html:patch}} /></>;
}
