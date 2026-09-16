const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
let cart=[];
const modal=$("#modal"), drawer=$("#cartDrawer"), toast=$("#toast");
function money(n){return Number(n).toFixed(3)+" KD"}
function openClip(card){
  $("#modalTitle").textContent=card.dataset.title;
  $("#modalPlayer").textContent=`#${card.dataset.number} · ${card.dataset.player.toUpperCase()}`;
  $("#modalPrice").textContent=money(card.dataset.price);
  $("#modalCart").onclick=()=>addCart(card);
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
}
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
$$(".preview").forEach(b=>b.onclick=()=>openClip(b.closest(".clip-card")));
$(".close").onclick=closeModal; $(".backdrop").onclick=closeModal;
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal();drawer.classList.remove("open")}});
function addCart(card){
  const item={player:card.dataset.player,title:card.dataset.title,price:Number(card.dataset.price)};
  cart.push(item); renderCart(); toast.classList.add("show"); setTimeout(()=>toast.classList.remove("show"),1500);
}
$$(".add-cart").forEach(b=>b.onclick=e=>{e.stopPropagation();addCart(b.closest(".clip-card"))});
function renderCart(){
  $("#cartCount").textContent=cart.length;
  $("#cartTotal").textContent=money(cart.reduce((s,x)=>s+x.price,0));
  $("#cartItems").innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-line"><div><b>${x.title}</b><small>${x.player}</small></div><div><b>${money(x.price)}</b><small><button onclick="removeCart(${i})" style="background:none;border:0;color:#7d868b;cursor:pointer">REMOVE</button></small></div></div>`).join(""):'<p class="empty">Your cart is empty.</p>';
}
window.removeCart=i=>{cart.splice(i,1);renderCart()};
$("#cartBtn").onclick=()=>drawer.classList.add("open"); $("#cartClose").onclick=()=>drawer.classList.remove("open");
$("#modalCart").onclick=()=>{};
$$("#filters button").forEach(btn=>btn.onclick=()=>{
  $$("#filters button").forEach(x=>x.classList.remove("on"));btn.classList.add("on");
  $$(".clip-card").forEach(c=>c.classList.toggle("hide",btn.dataset.filter!=="all"&&c.dataset.type!==btn.dataset.filter));
});
$("#playerSearch").onsubmit=e=>{
  e.preventDefault();const q=$("#searchInput").value.trim(),r=$("#searchResult");
  r.hidden=false;
  r.innerHTML=q?`Searching SideCam for <strong style="color:#b6ff3f">${q}</strong> — live player results will connect to the database in the backend phase.`:"Enter a player name, jersey number or team.";
};
$("#menuBtn").onclick=()=>$("#nav").classList.toggle("mobile");
$$(".open-match").forEach(b=>b.onclick=()=>document.querySelector("#clips").scrollIntoView({behavior:"smooth"}));
const sections=$$("main section[id]"), links=$$("#nav a");
window.addEventListener("scroll",()=>{let id="home";sections.forEach(s=>{if(scrollY>=s.offsetTop-160)id=s.id});links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id))});
