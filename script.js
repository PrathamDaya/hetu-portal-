let emotion = "";
const scriptURL = https://script.google.com/macros/s/AKfycbz-YgHPnWROmN9exFHbbLzVcPFUi8LNRiR-qMbsw8NfRU4fDw3Maimfza-yjZaULQNUPg/exec';
const res = await fetch('https://opensheet.elk.sh/16tRdA2j34yMIlwRyXXVDYhWnj1OJXMxqUJh44LyB4yQ/Sheet1');

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
