import React from 'react'

import './SpeechBubble.css'

class SpeechBubble extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.name,
            messages: this.props.messages,
            hide: false
        }

        this.enableActionKey();
    }

    enableActionKey = () => {
        this.actionKey = this.props.scene.input.keyboard.addKey('Q');
        this.actionKey.once('down', () => {
            console.log('!Q!');
            this.onClick();
        });
    }

    onClick = () => {
        var messages = this.state.messages;

        if (messages.length <= 1) {
            this.setState({
                hide: true
            });
            this.props.closeSpeechBubble();
            return;
        }

        this.props.scene.sound.play('CONFIRMATION_OO2', {volume: 0.5});

        messages.shift();
        console.log(messages);

        this.setState({
            messages: messages
        });

        this.enableActionKey();
    }

    render() {
        return (
            <div className={this.state.hide ? 'speech-bubble hide' : 'speech-bubble'}>
                <div className="contain" onClick={this.onClick}>
                    <div className="speech-name">
                        {this.state.name}
                    </div>
                    <div className="speech-text">
                        {this.state.messages[0]}
                    </div>
                </div>
            </div>
        )
    }

}
export default SpeechBubble