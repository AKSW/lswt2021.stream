# LSWT/DataWeek Stream Page

This is the JavaScript part to display a Live Stream in combination with at Chat on the conference web page.
It communicates with the chat relay via [socket.io](https://socket.io/).
The chat middle ware is at: [AKSW/chat.dataweek.de](https://github.com/AKSW/chat.dataweek.de). It responsibility is to provide a socket.io interface to relay the messages from and to the matrix room.

It consists of the:
- Frontend `stream.html` [deployment in the dataweek repo](https://github.com/AKSW/leipzig.dataweek.de/blob/develop/live/stream.html) ([permalink](https://github.com/AKSW/leipzig.dataweek.de/blob/6c8761ef6aac961ba52f17ead67ad23e49e409d4/live/stream.html))
- The Script `chat.js` [deployment in the dataweek repo](https://github.com/AKSW/leipzig.dataweek.de/blob/develop/resources/js/chat.js) ([permalink](https://github.com/AKSW/leipzig.dataweek.de/blob/6c8761ef6aac961ba52f17ead67ad23e49e409d4/resources/js/chat.js))
