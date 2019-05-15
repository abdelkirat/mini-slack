import {Component} from "react";
import React from "react";


class Messages extends Component {
    render() {
        const {messages} = this.props;
        return (
            <ul className="Messages-list">
                {messages.map(m => this.renderMessage(m))}
            </ul>
        );
    }
    renderMessage(message) {
        const {member, text} = message;
        const {currentMember} = this.props;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe ?
            "Messages-message currentMember" : "Messages-message";
        return (
            <li className={className}>
      <span
          className="avatar"
          style={{backgroundColor: member.color}}
      />
                <div className="Message-content">
                    <div className="username">
                        {member.username}
                    </div>
                    <div style={{backgroundColor: member.color}} className="text-member">{text}</div>
                </div>
            </li>
        );
    }

}

export default Messages;