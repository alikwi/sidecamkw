const matches=[
{id:1,date:"SEP 14, 2026",a:"AL QADSIA",b:"KUWAIT SC",venue:"KUWAIT SPORTS HALL",new:true},
{id:2,date:"SEP 12, 2026",a:"AL SAHEL",b:"AL ARABI",venue:"AL SULIBIKHAT COURT"},
{id:3,date:"SEP 10, 2026",a:"AL YARMOUK",b:"AL NASR",venue:"KUWAIT SPORTS HALL"},
{id:4,date:"SEP 08, 2026",a:"KAZMA",b:"AL TADHAMON",venue:"AL NASR CLUB"},
{id:5,date:"SEP 05, 2026",a:"AL ARABI",b:"KAZMA",venue:"KUWAIT SPORTS HALL"},
{id:6,date:"SEP 02, 2026",a:"KUWAIT SC",b:"AL NASR",venue:"AL SULIBIKHAT COURT"}
];
const clips=[
{id:1,type:"GOAL",title:"Top Corner Finish",player:"#10",match:"Al Qadsia vs Kuwait SC"},
{id:2,type:"SKILL",title:"1v1 Dribble",player:"#7",match:"Al Sahel vs Al Arabi"},
{id:3,type:"ASSIST",title:"Split-Pass Assist",player:"#18",match:"Al Yarmouk vs Al Nasr"},
{id:4,type:"SAVE",title:"Reaction Save",player:"#1",match:"Kazma vs Al Tadhamon"},
{id:5,type:"GOAL",title:"Counter Attack Finish",player:"#11",match:"Al Arabi vs Kazma"},
{id:6,type:"SKILL",title:"Touchline Escape",player:"#8",match:"Kuwait SC vs Al Nasr"}
];
let matchLimit=4, cart=0, selected=null;
const mg=document.querySelector("#matchGrid"), cg=document.querySelector("#clipGrid");
function crest(name){return name.split(" ").map(x=>x[0]).join("").slice(0,2)}
function renderMatches(){
 mg.innerHTML=matches.slice(0,matchLimit).map(m=>`<article class="match-card" data-id="${m.id}">
 <div class="match-image"><span class="date">${m.date}</span>${m.new?'<span class="new">NEW</span>':''}<div class="teams"><span class="crest">${crest(m.a)}</span><span class="vs">VS</span><span class="crest">${crest(m.b)}</span></div></div>
 <div class="match-body"><h3>${m.a} <span style="color:#59625f">/</span> ${m.b}</h3><p>⌖ ${m.venue}</p></div></article>`).join("");
}
function renderClips(filter="ALL"){
 const list=filter==="ALL"?clips:clips.filter(c=>c.type===filter);
 cg.innerHTML=list.map(c=>`<article class="clip-card" data-clip="${c.id}"><div class="clip-image"><span class="tag">${c.type}</span><span class="play-big">▶</span><span class="number">${c.player.replace("#","")}</span></div><div class="clip-body"><small class="kicker">${c.player} • ${c.type}</small><h3>${c.title}</h3><p>${c.match}</p><div class="clip-foot"><strong>2.000 KD</strong><span>PREVIEW ↗</span></div></div></article>`).join("");
 document.querySelectorAll("[data-clip]").forEach(el=>el.onclick=()=>openClip(+el.dataset.clip));
}
renderMatches(); renderClips();
const select=document.querySelector("#matchSelect");matches.forEach(m=>select.insertAdjacentHTML("beforeend",`<option value="${m.id}">${m.date} — ${m.a} vs ${m.b}</option>`));
document.querySelector("#viewAll").onclick=e=>{matchLimit=matchLimit===4?matches.length:4;renderMatches();e.target.textContent=matchLimit===4?"VIEW ALL MATCHES →":"SHOW LESS ↑"};
document.querySelectorAll("#filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll("#filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderClips(b.dataset.filter)});
document.querySelector("#finderForm").onsubmit=e=>{e.preventDefault();const m=matches.find(x=>x.id==select.value),n=document.querySelector("#jersey").value,r=document.querySelector("#finderResult");r.textContent=!m?"Choose a match first.":`Demo ready: searching ${m.a} vs ${m.b} for player #${n}. Player tagging will connect here next.`};
const modal=document.querySelector("#clipModal");
function openClip(id){selected=clips.find(c=>c.id===id);document.querySelector("#modalType").textContent=selected.type+" • "+selected.player;document.querySelector("#modalTitle").textContent=selected.title;document.querySelector("#modalMeta").textContent=selected.match;modal.classList.add("open");modal.setAttribute("aria-hidden","false")}
document.querySelector("#closeModal").onclick=()=>modal.classList.remove("open");modal.onclick=e=>{if(e.target===modal)modal.classList.remove("open")};
document.querySelector("#addCart").onclick=()=>{cart++;document.querySelector("#cartCount").textContent=cart;modal.classList.remove("open");const t=document.querySelector("#toast");t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)};
document.querySelector("#menuBtn").onclick=()=>{const n=document.querySelector("#nav");n.style.display=n.style.display==="flex"?"none":"flex"};
document.querySelector("#searchBtn").onclick=()=>document.querySelector("#players").scrollIntoView();
document.querySelector("#cartBtn").onclick=()=>{const t=document.querySelector("#toast");t.textContent=cart?`${cart} clip${cart>1?"s":""} in demo cart`:"Your cart is empty";t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)};
