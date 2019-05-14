import {Component} from "react";
import React from "react";


class Input extends Component{
    state = {
        textValue: ""
    }

    onChange(e) {
        this.setState({textValue: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({textValue: ""});
        this.props.onSendMessage(this.state.textValue);
    }

    render() {
        return (
            <div className="Input">
                <form onSubmit={e => this.onSubmit(e)}>
                    <input
                        onChange={e => this.onChange(e)}
                        value={this.state.textValue}
                        type="text"
                        placeholder="Message"
                    />
                    <button>Send</button>
                </form>
            </div>
        );
    }
}

export default Input;