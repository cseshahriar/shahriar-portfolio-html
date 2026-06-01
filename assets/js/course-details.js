/* Course details page extras: countdown, back-to-top, progress bars */
(function(){
  // Countdown — 6 days from now
  const target = new Date(Date.now() + 6*24*60*60*1000 + 7*60*60*1000);
  const elD=document.getElementById('cdD'),elH=document.getElementById('cdH'),
        elM=document.getElementById('cdM'),elS=document.getElementById('cdS');
  function pad(n){return String(n).padStart(2,'0')}
  function tick(){
    const diff = Math.max(0, target - new Date());
    const d=Math.floor(diff/86400000),
          h=Math.floor(diff/3600000)%24,
          m=Math.floor(diff/60000)%60,
          s=Math.floor(diff/1000)%60;
    if(elD){elD.textContent=pad(d);elH.textContent=pad(h);elM.textContent=pad(m);elS.textContent=pad(s)}
  }
  tick();setInterval(tick,1000);

  // Back to top
  const top = document.querySelector('[data-back-top]');
  if(top){
    window.addEventListener('scroll',()=>top.classList.toggle('show',window.scrollY>500));
    top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  }

  // IntersectionObserver to trigger bar fills + reveal
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view','is-visible');io.unobserve(e.target)}});
  },{threshold:.15});
  document.querySelectorAll('.career-card,.progress-demo,.reveal').forEach(el=>io.observe(el));

  // Play button placeholder
  const play=document.querySelector('.cd-play');
  if(play)play.addEventListener('click',()=>alert('Preview video would play here.'));

  // Year
  const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
