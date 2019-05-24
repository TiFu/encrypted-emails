let options = {
    name: "Thunderbird",
    auth: {
        user: "tino-fuhrmann",
        pass: ""

    }
}
let host = "web.de";
let port = 465;
var client = new window["emailjs-smtp-client"](host, port, options)
client.connect();

// run only once as 'idle' is emitted again after message delivery
var alreadySending = false;

client.onidle = function(){
    console.log("CLIENT IDLE!");
    if(alreadySending){
        return;
    }
    alreadySending = true;
    client.useEnvelope({
        from: "tino-fuhrmann@web.de",
        to: ["tino.fuhrmann1@gmail.com"]
    });
}

client.onready = function(){
    console.log("Client ready!")
    client.send("Subject: test\r\n");
    client.send("\r\n");
    client.send("Message body");
    client.end();
}