import WebSocket from 'ws';

class Websocket {
    constructor(url, options = {}) {
        this.url = url;
        this.options = options;
        this.ws = null;
    }

    connect() {
        this.ws = new Websocket(this.url, this.options);
        this.ws.onopen = () => {
            console.log('WebSocket connection opened');
        }
        this.ws.onmessage = (event) => {
            console.log("WebSocket message received", event.data);
        }
        this.ws.onerror = (error) => {
            console.log("WebSocket Error Occurred", error);
        }
        this.ws.onclose = () => {
            console.log("WebSocket connection closed");
        }
    }

    send(data) {
        if (this.ws.readyState === l) {
            this.ws.send(data)
        }
    }

    close() {
        this.ws.close();
    }
}

export default Websocket;
