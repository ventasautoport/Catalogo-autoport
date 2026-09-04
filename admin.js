import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { firebaseConfig, ADMIN_EMAIL } from "./firebase-config.js";
import { initialData } from "./data.js";

const app=initializeApp(firebaseConfig), auth=getAuth(app), db=getFirestore(app);
const $=s=>document.querySelector(s);
let data=structuredClone(initialData);

onAuthStateChanged(auth,async user=>{
  if(!user || user.email.toLowerCase()!==ADMIN_EMAIL.toLowerCase()){ location.href="login.html"; return; }
  $("#loading").hidden=true; $("#adminApp").hidden=false; $("#userEmail").textContent=user.email;
  const snap=await getDoc(doc(db,"site","catalog")); if(snap.exists()) data=snap.data();
  renderForm();
});
$("#logout").onclick=()=>signOut(auth);

function renderForm(){
  const s=data.site;
  $("#siteName").value=s.name||""; $("#headline").value=s.headline||""; $("#description").value=s.description||"";
  $("#whatsapp").value=s.whatsapp||""; $("#phone").value=s.phone||""; $("#address").value=s.address||"";
  $("#primaryColor").value=s.primaryColor||"#d71920"; $("#darkColor").value=s.darkColor||"#111111"; $("#heroImage").value=s.heroImage||"";
  renderProducts();
}
function renderProducts(){
  const box=$("#productsEditor"); box.innerHTML="";
  data.categories.forEach((cat,ci)=>{
    const group=document.createElement("div"); group.className="cat-editor";
    group.innerHTML=`<div class="row-between"><h3>${cat.name}</h3><button class="btn small add-in-cat" data-ci="${ci}">+ Producto</button></div>`;
    cat.products.forEach((p,pi)=>{
      const item=document.createElement("div"); item.className="edit-product";
      item.innerHTML=`
      <input data-ci="${ci}" data-pi="${pi}" data-k="name" value="${esc(p.name)}" placeholder="Nombre">
      <textarea data-ci="${ci}" data-pi="${pi}" data-k="description" placeholder="Descripción">${esc(p.description||"")}</textarea>
      <input data-ci="${ci}" data-pi="${pi}" data-k="image" value="${esc((p.images&&p.images[0])||"")}" placeholder="URL foto principal">
      <input data-ci="${ci}" data-pi="${pi}" data-k="before" value="${esc(p.before||"")}" placeholder="URL foto ANTES">
      <input data-ci="${ci}" data-pi="${pi}" data-k="after" value="${esc(p.after||"")}" placeholder="URL foto DESPUÉS">
      <button class="btn danger remove-product" data-ci="${ci}" data-pi="${pi}">Eliminar</button>`;
      group.appendChild(item);
    });
    box.appendChild(group);
  });
  box.querySelectorAll("input,textarea").forEach(el=>el.oninput=()=>{
    const c=+el.dataset.ci,p=+el.dataset.pi,k=el.dataset.k;
    if(k==="image") data.categories[c].products[p].images=el.value?[el.value]:[];
    else data.categories[c].products[p][k]=el.value;
  });
  box.querySelectorAll(".remove-product").forEach(b=>b.onclick=()=>{ data.categories[+b.dataset.ci].products.splice(+b.dataset.pi,1); renderProducts(); });
  box.querySelectorAll(".add-in-cat").forEach(b=>b.onclick=()=>{ const c=+b.dataset.ci; data.categories[c].products.push({id:"p-"+Date.now(),name:"Nuevo producto",description:"",images:[],before:"",after:""}); renderProducts(); });
}
$("#addProduct").onclick=()=>{ data.categories.push({id:"cat-"+Date.now(),name:"Nueva sección",products:[{id:"p-"+Date.now(),name:"Nuevo producto",description:"",images:[],before:"",after:""}]}); renderProducts(); };

function syncSite(){
  data.site.name=$("#siteName").value; data.site.headline=$("#headline").value; data.site.description=$("#description").value;
  data.site.whatsapp=$("#whatsapp").value; data.site.phone=$("#phone").value; data.site.address=$("#address").value;
  data.site.primaryColor=$("#primaryColor").value; data.site.darkColor=$("#darkColor").value; data.site.heroImage=$("#heroImage").value;
}
$("#saveAll").onclick=async()=>{
  syncSite(); const btn=$("#saveAll"); btn.disabled=true; btn.textContent="Guardando…";
  try{ await setDoc(doc(db,"site","catalog"),data); btn.textContent="✓ Guardado"; setTimeout(()=>{btn.textContent="Guardar cambios";btn.disabled=false},1400);}
  catch(e){ alert("No se pudo guardar. Revisá la configuración de Firebase y las reglas de Firestore."); btn.disabled=false; btn.textContent="Guardar cambios"; }
};
function esc(v){return String(v||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
