import { io } from "socket.io-client";

// const socket = io("wss://chat.lswt2021.comiles.eu/ws");
const socket = io("ws://localhost:5000/ws");
// const ws = new WebSocket('wss://chat.lswt2021.comiles.eu/ws');
// const ws = new WebSocket('ws://localhost:5000/ws');

socket.on('server_message', (data) => {
  console.log("message received");
  console.log(data);
  let e = document.createElement('p');
  let sp_nick = document.createElement('span');
  let sp_time = document.createElement('span');
  let sp_message = document.createElement('span');
  sp_nick.innerHTML = data.nickname;
  sp_time.innerHTML = data.time;
  sp_time.setAttribute("class", "date");
  sp_message.innerHTML = data.body;
  e.append(sp_time);
  e.append(" ");
  e.append(sp_nick);
  e.append(": ");
  e.append(sp_message);

  document.getElementById('message-box').prepend(e);
});

function sendMessage() {
  console.log("send message");

  const nickname = htmlEntities(document.getElementById('nickname-input').value);
  const message_body = htmlEntities(document.getElementById('message-input').value);

  if (nickname.trim() == "" || message_body.trim() == "") {
    console.log("nickname or message body not set, will not send message");
    if (nickname.trim() == "") {
      document.getElementById('nickname-input').required = "true";
    }
    if (message_body.trim() == "") {
      document.getElementById('message-input').required = "true";
    }
  } else {
    const message = {
      body: message_body,
      nickname: nickname
    };
    console.log(message);
    if (message) {
      socket.emit('client_message', message);
    }
    document.getElementById('message-input').value = '';
  }
  return false;
}


function htmlEntities(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function isPressingEnter(e){
  let k;
  if(window.event){
    k = e.keyCode;
    if(k===13){
      sendMessage();
    }
  } else if(e.which){
    k = e.which;
    if(k===13){
      sendMessage();
    }
  }
}

window.isPressingEnter = isPressingEnter;
window.sendMessage = sendMessage;
