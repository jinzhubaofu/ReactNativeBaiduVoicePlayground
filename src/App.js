/**
 * @file App
 * @author leon<ludafa@outlook.com>
 */


import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

console.log(Keyboard);

import {
    startRecognition
} from 'react-native-baidu-voice-recognition';

import WebViewBridge from 'react-native-webview-bridge';

import styles from './App.css.js';

function autoHttpPrefix(url) {

    return /^(https?|ftp):\/\//.test(url)
        ? url
        : `http://${url}`;

}

const API_KEY = 'g8ylHecLtt4WyTuPFG7Fssu0';
const SECRET_KEY = '391b8964cb174efc85eac80b5fcf6be5';

export default class ReactNativeBaiduVoicePlayground extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recognizing: false,
            content: 'Welcome To ReactNative!',
            buffer: '',
            uri: 'http://localhost:9000/index.html',
            editing: false,
            editingUri: null
        };
    }

    async startRecognition() {

        const me = this;

        me.setState({
            recording: true
        });

        if (me.recognition) {
            await me.recognition.cancel();
            me.recognition = null;
        }

        me.recognition = await startRecognition({
            apiKey: API_KEY,
            secretKey: SECRET_KEY,
            onStart() {
                console.log('start');
                me.setState({
                    recognizing: true
                });
            },
            onSpeechStart() {
                console.log('speech-start');
            },
            onFlushData(data) {
                me.setState({
                    buffer: data.results[0]
                });
            },
            onCancel() {
                me.recognition = null;
                me.setState({
                    recognizing: false,
                    buffer: ''
                });
            },
            onError(error) {
                console.log(error);
                me.recognition = null;
                me.setState({
                    recording: false,
                    recognizing: false,
                    buffer: ''
                });
            },
            onFinish(data) {
                console.log('finish');
                me.recognition = null;
                me.setState({
                    recording: false,
                    recognizing: false,
                    content: `${me.state.content}\n${data.results[0]}`,
                    buffer: ''
                });
            }
        });

    }

    async finishRecognition() {

        if (!this.recognition) {
            return;
        }

        if (Date.now() - this.recognition.timestamp > 1000) {
            if (this.state.recording) {
                this.setState({
                    recording: false
                });
            }
            await this.recognition.finish();
        }
        else {
            await this.recognition.cancel();
        }

    }

    render() {

        const {
            content,
            buffer,
            recording,
            recognizing,
            uri,
            editingUri,
            editing
        } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.navContainer}>
                    <TextInput
                        ref="uriInput"
                        style={styles.uriInput}
                        value={editingUri == null ? uri : editingUri}
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="url"
                        returnKeyType="go"
                        selectTextOnFocus={true}
                        clearButtonMode="while-editing"
                        onChangeText={text => {
                            this.setState({editingUri: text});
                        }}
                        enablesReturnKeyAutomatically={true}
                        onFocus={() => this.setState({editing: true})}
                        onEndEditing={() => {
                            this.setState({editing: false, editingUri: null});
                        }}
                        blurOnSubmit={true}
                        onSubmitEditing={event => this.setState({
                            uri: autoHttpPrefix(event.nativeEvent.text)
                        })} />
                    <TouchableHighlight
                        style={styles.goTouchableHighlight}
                        underlayColor="#ffffff50"
                        onPress={() => {
                            this.setState({
                                uri: autoHttpPrefix(editingUri || uri)
                            });
                            console.log(`go: ${editingUri || uri}`);
                            if (this.refs.uriInput) {
                                this.refs.uriInput.blur();
                            }
                        }} >
                        <Text style={styles.go}>GO</Text>
                    </TouchableHighlight>
                </View>
                <WebViewBridge
                    style={{flex: 1}}
                    source={{uri}} />
            </View>
        );
    }
}
