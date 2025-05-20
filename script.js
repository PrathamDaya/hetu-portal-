let emotion = "";
const URL = "https://script.google.com/macros/s/AKfycbzQsTJstltEh7ULawtJMqiTEE8aG97SAho6gs548FyFJrO7YHWlVMcpUKf0jSc6hpx2/exec";  // Replace with your Google Apps Script URL

function pick(e) {
  emotion = e;
  document.getElementById("opts").style.display="none";
  document.getElementById("form").style.display="block";
}

function send() {
  const m = document.getElementById("msg").value.trim();
  if(!m) return alert("Type something!");
  fetch(URL, {
    method:"POST",
    body: JSON.stringify({ emotion, message: m }),
    headers:{ "Content-Type":"application/json" }
  });
  document.getElementById("form").style.display="none";
  document.getElementById("thank").style.display="block";
  document.getElementById("thanksText").innerText =
    emotion==="Grievance"
      ? "Prath will solve this 💪"
      : "Thank you, Hetu 💖\nLove, Prath";
}

function reset(){
  document.getElementById("thank").style.display="none";
  document.getElementById("opts").style.display="flex";
  document.getElementById("msg").value="";
}
