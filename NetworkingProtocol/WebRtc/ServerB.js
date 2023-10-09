// 1. this is the offer created by Server A and send it to (via whatsapp, tweet, axios fetch, etc ) but we copied here
const offer = {
  type: "offer",
  sdp: "v=0\r\no=- 8081324153459025915 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:2141701514 1 udp 2113937151 05ad2c18-aae4-4bbe-a6ca-c3cf02a20a67.local 52669 typ host generation 0 network-cost 999\r\na=candidate:3369707031 1 udp 2113939711 cc923a94-0aba-4b8c-8488-45bd1b85a252.local 63839 typ host generation 0 network-cost 999\r\na=ice-ufrag:t/E6\r\na=ice-pwd:qP8wabf3eM65WNMEctN7a7Fb\r\na=ice-options:trickle\r\na=fingerprint:sha-256 50:A5:61:91:1D:42:41:A6:91:2E:5E:50:7F:1F:45:5B:73:0F:9F:B0:04:E0:6D:C0:B6:F6:DC:19:EA:CC:30:15\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
};

const remoteConnection = new RTCPeerConnection();

remoteConnection.onicecandidate = (e) =>
  console.log(
    "New Ice candidate! reprinting SDP" +
      JSON.stringify(remoteConnection.localDescription)
  );

remoteConnection.ondatachannel = (e) => {
  remoteConnection.dc = e.channel;
  remoteConnection.dc.onmessage = (e) =>
    console.log("new message from client! " + e.data);
  remoteConnection.dc.onopen = (e) => console.log("Connection Opeaned !!!");
};

remoteConnection
  .setRemoteDescription(offer)
  .then((a) => console.log("Offer Set!!!"));

// 2. This step will create answer and this ANSWER again you have to send to server A (via whatsapp, tweet, axios fetch, etc ) but we copied here
remoteConnection
  .createAnswer()
  .then((a) => remoteConnection.setLocalDescription(a))
  .then((a) => console.log("answer created"));

// 3. After this the connection will be opeaned once you have the ANSWER on SERVER A (and process it)

// 4. TO send message from SERVER B you can do

remoteConnection.dc.send("fine what about you ");

// LINKS TO LEARN BETTER
// https://web.dev/webrtc-basics/
