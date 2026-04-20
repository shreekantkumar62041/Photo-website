let total = 0;

// TOTAL
document.addEventListener("DOMContentLoaded",()=>{
 document.querySelectorAll("input[type=checkbox]").forEach(cb=>{
  cb.addEventListener("change",()=>{
   total = 0;
   document.querySelectorAll("input[type=checkbox]:checked")
   .forEach(c=> total += Number(c.dataset.price));

   document.getElementById("total").innerHTML = "Total: &#8377;" + total;
  });
 });
});

// PAYMENT
function pay(){

 let name = document.getElementById("name").value;
 let date = document.getElementById("date").value;

 let events=[];
 document.querySelectorAll("input[type=checkbox]:checked")
 .forEach(c=>events.push(c.value));

 if(!name || !date || events.length==0){
  alert("Fill details");
  return;
 }

 var options={
  key:"rzp_test_Sffv2QbuAaeRAU",
  amount:50000,

  handler:function(res){

   let data={
    name,date,events,total,
    payment_id:res.razorpay_payment_id,
    time:new Date().toLocaleString()
   };

   let h=JSON.parse(localStorage.getItem("history"))||[];
   h.push(data);
   localStorage.setItem("history",JSON.stringify(h));

   localStorage.setItem("booking",JSON.stringify(data));

   location="slip.html";
  }
 };

 new Razorpay(options).open();
}

// MENU
function toggleMenu(){
 let m=document.getElementById("menu");
 m.style.display = m.style.display=="block"?"none":"block";
}

function goDashboard(){ location="dashboard.html"; }
function goSlip(){ location="slip.html"; }

function logout(){
 localStorage.clear();
 location="index.html";
}