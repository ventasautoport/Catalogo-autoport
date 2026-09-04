import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";
import { initialData } from "./data.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const $ = s => document.querySelector(s);
let data = initialData;

async function loadData(){
  try{
    const snap = await getDoc(doc(db,"site","catalog"));
    if(snap.exists()) data = snap.data();
  }catch(e){ console.warn("Usando catálogo inicial:",e); }
  render();
}
function waNumber(v){ return String(v||"").replace(/\D/g,""); }
function render(){
  const s=data.site||initialData.site;
  document.title=`${s.name||"AUTOPORT"} | Catálogo`;
  $("#brandName").textContent=s.name||"AUTOPORT";
  $("#headline").textContent=s.headline||"";
  $("#description").textContent=s.description||"";
  $("#whatsappText").textContent=s.whatsapp||"";
  $("#phoneText").textContent=s.phone||"";
  $("#addressText").textContent=s.address||"";
  $("#heroImage").src=s.heroImage||"assets/hero-placeholder.svg";
  const wa=`https://wa.me/${waNumber(s.whatsapp)}?text=${encodeURIComponent("Hola AUTOPORT, quiero consultar por un producto del catálogo.")}`;
  $("#heroWhatsapp").href=wa; $("#contactWhatsapp").href=wa;
  document.documentElement.style.setProperty("--primary",s.primaryColor||"#d71920");
  document.documentElement.style.setProperty("--dark",s.darkColor||"#111");
  renderCategories();
  $("#year").textContent=new Date().getFullYear();
}
function renderCategories(){
  const nav=$("#categoryNav"), cat=$("#catalog");
  nav.innerHTML=""; cat.innerHTML="";
  const all=(data.categories||[]).flatMap(c=>c.products.map(p=>({...p,category:c.name})));
  for(const [i,c] of (data.categories||[]).entries()){
    const b=document.createElement("article"); b.className="cat-card";
    b.innerHTML=`<b>0${i+1}</b><strong>${c.name}</strong><span>${c.products.length} producto${c.products.length===1?"":"s"} · Ver catálogo →</span>`;
    b.onclick=()=>{ $("#search").value=""; showProducts(c.products,c.name); location.hash="catalogo"; };
    nav.appendChild(b);
  }
  showProducts(all,"Todos");
}
function showProducts(products,title){
  const cat=$("#catalog"); cat.innerHTML="";
  $("#activeCategory").textContent=(title||"Todos").toUpperCase();
  for(const p of products){
    const img=(p.images&&p.images[0])||p.after||p.before||"assets/product-placeholder.svg";
    const card=document.createElement("article"); card.className="product-card";
    card.innerHTML=`<img src="${img}" alt="${p.name}"><div class="product-body"><span class="tag">${p.category||title}</span><h3>${p.name}</h3><p>${p.description||""}</p><strong>Consultar cotización</strong><a class="text-link" target="_blank" href="https://wa.me/${waNumber(data.site.whatsapp)}?text=${encodeURIComponent("Hola AUTOPORT, quiero consultar por: "+p.name)}">Consultar →</a></div>`;
    cat.appendChild(card);
  }
}
$("#search").addEventListener("input",e=>{
  const q=e.target.value.toLowerCase();
  const all=(data.categories||[]).flatMap(c=>c.products.map(p=>({...p,category:c.name})));
  showProducts(all.filter(p=>(p.name+" "+p.description+" "+p.category).toLowerCase().includes(q)),"Resultados");
});
loadData();
