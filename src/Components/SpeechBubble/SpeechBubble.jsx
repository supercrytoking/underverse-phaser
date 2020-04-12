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

        console.log(this.props);
    }

    onClick = () => {
        this.props.scene.sound.play('CONFIRMATION_OO2', {volume: 0.5});

        var messages = this.state.messages;

        messages.shift();
        console.log(messages);

        this.setState({
            messages: messages
        })

        if (!messages.length) {
            this.setState({
                hide: true
            });
            this.props.closeSpeechBubble();
        }
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