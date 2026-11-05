(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduce)document.querySelectorAll('video').forEach(function(v){v.removeAttribute('autoplay');v.pause()});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add('on');e.target.querySelectorAll('.num[data-n]').forEach(count);io.unobserve(e.target)})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(el,i){el.style.transitionDelay=(i%4)*60+'ms';io.observe(el)});
function fmt(n){return '$'+Math.round(n).toLocaleString('en-US')}
function count(el){var n=+el.dataset.n;if(reduce){el.textContent=fmt(n);return}var t0=performance.now();(function f(t){var p=Math.min(1,(t-t0)/900);el.textContent=fmt(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0);setTimeout(function(){el.textContent=fmt(n)},1000)}
document.querySelectorAll('form[data-thanks]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var p=document.createElement('p');p.textContent=f.dataset.thanks;p.setAttribute('role','status');f.replaceWith(p)})});

var fls=[].slice.call(document.querySelectorAll('.flow'));function dr(){fls.forEach(function(f){var r=f.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight*.75)));f.querySelectorAll('.fl').forEach(function(x){x.style.strokeDashoffset=reduce?0:1-p})})}addEventListener('scroll',dr,{passive:true});dr();
var pb=document.querySelector('.pipbtn');if(pb){var pus=pb.querySelectorAll('.pu'),bx=[76,124];addEventListener('pointermove',function(e){if(reduce)return;var r=pb.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.hypot(dx,dy)||1;pus.forEach(function(p,i){p.setAttribute('cx',bx[i]+dx/d*5);p.setAttribute('cy',78+dy/d*5)})});
var Q=['What would you do if nobody graded it?','Who’s saying “should”?','What did you stop caring about?','What would you miss?','Which part are you scared to say out loud?','Did you take the first answer?','Who is this decision for?'],qi=0,bub=pb.querySelector('.bub');pb.addEventListener('click',function(){bub.hidden=false;bub.textContent=Q[qi++%Q.length]})}
var form=document.getElementById('pipform');if(!form)return;
var box=form.parentNode,inp=document.getElementById('pipin'),lab=document.getElementById('piplabel'),card=document.getElementById('pipcard');
var step=0,q='',ans=[];
function qs(s){var l=s.toLowerCase();return [ /should/.test(l)?'Who’s saying “should”?':'Who else is inside this question?','What would you miss?','If nobody ever graded it, which would you choose?']}
form.addEventListener('submit',function(e){e.preventDefault();var v=inp.value.trim();if(!v)return;
if(step===0){q=v}else{ans.push(v)}
step++;box.dataset.step=step;inp.value='';inp.placeholder='Say it the way you’d say it out loud';
if(step<4){lab.textContent=qs(q)[step-1];if(document.activeElement===inp||!run)inp.focus({preventScroll:true});return}
form.hidden=true;card.hidden=false;document.getElementById('o1').textContent=q;document.getElementById('o2').textContent=ans.slice(0,2).join(' ');document.getElementById('o3').textContent='You already said it: “'+ans[2]+'”'});
function reset(){step=0;ans=[];q='';box.dataset.step=0;card.hidden=true;form.hidden=false;lab.textContent='What’s on your mind?';inp.value='';inp.placeholder='Should I change jobs?'}
var demo=['Should I change jobs?','Mostly my parents.','Making things with my hands.','The small project first.'],run=0;
function wait(ms){return new Promise(function(r){setTimeout(r,ms)})}
function play(){var id=++run;reset();var i=0;(function next(){if(id!==run||i>=demo.length)return;var s=demo[i++],k=0;wait(i===1?300:900).then(function t(){if(id!==run)return;inp.value=s.slice(0,++k);if(k<s.length)return wait(42).then(t);return wait(450).then(function(){if(id!==run)return;form.requestSubmit();next()})})})()}
inp.addEventListener('pointerdown',function(){if(run){run++}});inp.addEventListener('keydown',function(){run++});
document.getElementById('replay').addEventListener('click',play);
document.getElementById('again').addEventListener('click',function(){run++;reset();inp.focus()});
if(!reduce){var seen=false,ao=new IntersectionObserver(function(es){if(es[0].isIntersecting&&!seen){seen=true;ao.disconnect();play()}},{threshold:.55});ao.observe(box)}
})();
