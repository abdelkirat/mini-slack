import React, { Component } from 'react';
import './App.css';
import Input from './utils/Input';
import Messages from './utils/Messages';
import Room from "./utils/Room";

function randomName() {
    const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
    const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

function randomId() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

class App extends Component {
        state = {
            connected: 0,
            message: '',
            messages: [
                {
                    text: "",
                    member: {
                        color: "",
                        username: ""
                    }
                }
            ],
            member: {
                id: randomId(),
                username: randomName(),
                color: randomColor()
            }
        };

        ws = new WebSocket("ws://localhost:4000/");

    componentDidMount() {
        const nbUsersElem = document.getElementById("nbUsers");
        this.ws.onopen = () => {
            console.log('connected');
            this.sendOldMessage();
        }

        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.number !== undefined) {
                nbUsersElem.innerHTML = message.number;
            }
            if(message.text !== undefined) {
                this.addMessage(message)
            }
        };

        this.ws.onclose = () => {
            console.log('disconnected')
            this.setState({
                ws: new WebSocket("ws://localhost:4000"),
            })
        }

        window.addEventListener("beforeunload", () => this.ws.send("CLOSE"));
    }

    addMessage = message => {
        const messages = this.state.messages
        messages.push({
            text: message.text,
            member: message.member
        })
        this.setState({messages: messages})
    }

    sendOldMessage() {
        this.ws.send(JSON.stringify(this.state.messages));
    }

    onSendMessage = messageString => {
        const message = { text: messageString, member: this.state.member}
        this.ws.send(JSON.stringify(message))
        this.addMessage(message)
    }

    render() {
        return(
            <div className="App">
                <div className="App-header">
                    <h1>Mini-slack</h1>
                    <p><span id="nbUsers">0</span> utilisateurs en ligne</p>
                </div>
                <div className="content-wrapper">
                    <Room/>
                    <Messages
                        messages={this.state.messages}
                        currentMember={this.state.member}
                    />
                    <Input
                        onSendMessage={this.onSendMessage}
                    />
                </div>

            </div>
        );
    }
}

export default App;