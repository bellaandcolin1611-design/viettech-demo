const products=[
{id:1,name:"Máy tính để bàn VietTech Pro",category:"computer",tag:"BÁN CHẠY",emoji:"🖥️",image:"https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=900&q=85",desc:"Hiệu năng mạnh mẽ cho công việc và sáng tạo.",price:25990000},
{id:2,name:"Laptop VietTech Air 14",category:"computer",tag:"MỚI",emoji:"💻",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",desc:"Mỏng nhẹ, linh hoạt, pin bền bỉ cả ngày.",price:18990000},
{id:3,name:"Bàn phím cơ RGB Gaming",category:"peripheral",tag:"GAMING",emoji:"⌨️",image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85",desc:"Switch chính xác, đèn RGB tùy chỉnh.",price:1590000},
{id:4,name:"Chuột không dây Pro",category:"peripheral",tag:"PHỔ BIẾN",emoji:"🖱️",image:"https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85",desc:"Thiết kế công thái học, cảm biến chính xác.",price:890000},
{id:5,name:"Tai nghe Bluetooth ANC",category:"audio",tag:"CÔNG NGHỆ MỚI",emoji:"🎧",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",desc:"Chống ồn chủ động, âm thanh chi tiết.",price:2490000},
{id:6,name:"Màn hình 27 inch 2K",category:"computer",tag:"LỰA CHỌN TỐT",emoji:"🖥️",image:"https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=900&q=85",desc:"Hình ảnh sắc nét, tối ưu đa nhiệm.",price:5790000},
{id:7,name:"Hub USB-C đa năng 8-in-1",category:"peripheral",tag:"TIỆN ÍCH",emoji:"🔌",image:"https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=85",desc:"Mở rộng kết nối cho góc làm việc hiện đại.",price:790000},
{id:8,name:"Loa Bluetooth Desktop",category:"audio",tag:"THIẾT KẾ ĐẸP",emoji:"🔊",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",desc:"Âm thanh sống động trong thiết kế nhỏ gọn.",price:1290000}
];
const money=n=>new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",maximumFractionDigits:0}).format(n);
let cart=JSON.parse(localStorage.getItem("viettech-cart")||"[]");
let signedInEmail="";
const grid=document.getElementById("product-grid"),cartItems=document.getElementById("cart-items"),drawer=document.getElementById("cart-drawer"),overlay=document.getElementById("overlay"),toast=document.getElementById("toast");
function renderProducts(filter="all"){
 const list=filter==="all"?products:products.filter(p=>p.category===filter);
 grid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-visual"><span class="product-tag">${p.tag}</span><img class="product-photo" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span class="product-emoji" style="display:none">${p.emoji}</span></div><div class="product-info"><h3>${p.name}</h3><p class="product-desc">${p.desc}</p><div class="product-bottom"><div class="price">${money(p.price)}</div><button class="add-button" data-add="${p.id}">＋ Thêm vào giỏ</button></div></div></article>`).join("");
}
function saveCart(){localStorage.setItem("viettech-cart",JSON.stringify(cart));renderCart()}
function add(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart();notify("Đã thêm sản phẩm vào giỏ hàng.");}
function renderCart(){
 document.getElementById("cart-count").textContent=cart.reduce((s,x)=>s+x.qty,0);
 if(!cart.length)cartItems.innerHTML='<p class="empty-cart">Giỏ hàng của bạn đang trống.</p>';
 else cartItems.innerHTML=cart.map(x=>{const p=products.find(y=>y.id===x.id);if(!p)return "";return `<div class="cart-item"><div class="cart-thumb"><img src="${p.image}" alt="${p.name}" loading="lazy"></div><div><h3>${p.name}</h3><div class="item-price">${money(p.price)}</div><div class="qty-control"><button data-qty="${p.id}" data-delta="-1">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-delta="1">＋</button></div></div><button class="remove-item" data-remove="${p.id}">×</button></div>`}).join("");
 const total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);document.getElementById("cart-total").textContent=money(total);
}
function notify(s){toast.textContent=s;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200)}
function showCart(v){drawer.classList.toggle("open",v);overlay.classList.toggle("show",v);drawer.setAttribute("aria-hidden",String(!v));document.body.style.overflow=v?"hidden":""}
function showLogin(){document.getElementById("login-modal").classList.add("show");document.getElementById("login-modal").setAttribute("aria-hidden","false")}
function hideLogin(){document.getElementById("login-modal").classList.remove("show");document.getElementById("login-modal").setAttribute("aria-hidden","true")}
function updateAccount(){document.getElementById("account-btn").textContent=signedInEmail?signedInEmail:"Đăng nhập"}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)add(Number(b.dataset.add))});
document.querySelector(".filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts(b.dataset.filter)});
cartItems.addEventListener("click",e=>{const q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");if(q){const item=cart.find(x=>x.id===Number(q.dataset.qty));item.qty+=Number(q.dataset.delta);if(item.qty<1)cart=cart.filter(x=>x!==item);saveCart()}if(r){cart=cart.filter(x=>x.id!==Number(r.dataset.remove));saveCart()}});
document.getElementById("open-cart").addEventListener("click",()=>showCart(true));
document.getElementById("close-cart").addEventListener("click",()=>showCart(false));
overlay.addEventListener("click",()=>showCart(false));
document.getElementById("account-btn").addEventListener("click",()=>signedInEmail?notify("Bạn đang đăng nhập: "+signedInEmail):showLogin());
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",hideLogin));
document.getElementById("checkout").addEventListener("click",()=>{if(!cart.length){notify("Giỏ hàng đang trống.");return}if(!signedInEmail){showCart(false);showLogin();return}notify("Đăng nhập thành công. Cần kết nối hệ thống đơn hàng để hoàn tất thanh toán.");});
document.getElementById("mobile-menu").addEventListener("click",()=>document.getElementById("nav").classList.toggle("show"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("show")));
/*
  GOOGLE SIGN-IN SETUP:
  1. Create an OAuth 2.0 Web Client ID in Google Cloud Console.
  2. Add your production domain to Authorized JavaScript origins.
  3. Replace YOUR_GOOGLE_CLIENT_ID with the real client ID below.
  4. Verify the returned ID token on your server before creating a session or order.
  The user enters their Google password only on Google's own sign-in page.
*/
const GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID";
function handleGoogleCredential(response){
 try{
   const payload=JSON.parse(atob(response.credential.split(".")[1].replace(/-/g,"+").replace(/_/g,"/")));
   signedInEmail=payload.email||"Tài khoản Google";
   updateAccount();hideLogin();notify("Xin chào "+signedInEmail);
 }catch(e){notify("Không thể xác nhận tài khoản. Vui lòng thử lại.");}
}
window.addEventListener("load",()=>{
 if(window.google&&GOOGLE_CLIENT_ID!=="YOUR_GOOGLE_CLIENT_ID"){
   google.accounts.id.initialize({client_id:GOOGLE_CLIENT_ID,callback:handleGoogleCredential});
   google.accounts.id.renderButton(document.getElementById("google-button"),{theme:"outline",size:"large",shape:"rectangular",text:"continue_with",width:250});
   document.getElementById("google-fallback").style.display="none";
 }
});
document.getElementById("google-fallback").addEventListener("click",()=>notify("Chủ website cần cấu hình Google OAuth Client ID để bật đăng nhập thật."));
renderProducts();renderCart();
