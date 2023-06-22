import { io } from "socket.io-client";

// const socket = io("wss://chat.lswt2021.comiles.eu/ws");
const socket = io("ws://localhost:8000", {someVar: "bla"});
// const ws = new WebSocket('wss://chat.lswt2021.comiles.eu/ws');
// const ws = new WebSocket('ws://localhost:5000/ws');

socket.on('connect', () => {
  console.log(`connect ${socket.id}`);
  var stream_id = window.location.hash.substring(1);
  zapp(stream_id);
});

socket.on('disconnect', () => {
  console.log(`disconnect ${socket.id}`);
});

socket.on('server_message', (message) => {
  console.log("message received");
  console.log(message);
  let e = document.createElement('p');
  if (message.type == 'message') {
    let sp_nick = document.createElement('span');
    let sp_time = document.createElement('span');
    let sp_message = document.createElement('span');
    sp_nick.innerHTML = message.nickname;
    sp_time.innerHTML = message.time;
    sp_time.setAttribute("class", "date");
    sp_message.innerHTML = message.body;
    e.append(sp_time);
    e.append(" ");
    e.append(sp_nick);
    e.append(": ");
    e.append(sp_message);
  }
  if (message.type == 'topic') {
    let sp_nick = document.createElement('span');
    let sp_message = document.createElement('span');
    sp_nick.innerHTML = "topic";
    sp_message.innerHTML = message.body;
    e.append(sp_nick);
    e.append(": ");
    e.append(sp_message);
    updateVideo(message.body);
    // updateStreams(topicData.streams);
  }

  document.getElementById('message-box').prepend(e);
});

function updateVideo(videoUrl) {
  let currentUrl = document.getElementById('videoframe').getAttribute("src");
  if (currentUrl != videoUrl) {
    document.getElementById('videoframe').setAttribute("src", videoUrl);
  }
}

socket.on('streams_update', (streamList) => {
  const stream_selection = document.getElementById('stream_selection');
  stream_selection.innerHTML = '';
  console.log(streamList);
  for (let room_id in streamList) {
    let stream_link = document.createElement('a');
    stream_link.setAttribute("href", "javascript:zapp('" + room_id + "')");
    stream_link.append(streamList[room_id] );
    stream_selection.append(stream_link);
    stream_selection.append(" ");
  }
});

function zapp(stream_id) {
  // clear messages
  const message_box = document.getElementById('message-box');
  message_box.innerHTML = '';
  socket.emit('client_zapp', stream_id);
}

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
window.zapp = zapp;
