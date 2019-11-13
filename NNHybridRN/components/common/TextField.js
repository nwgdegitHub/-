import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';

export default class TextField extends Component {

    static propTypes = {
        textFieldStyle: PropTypes.object,
        leftView: PropTypes.element,
        leftViewStyle: PropTypes.object,
        rightView: PropTypes.element,
        rightViewStyle: PropTypes.object,
        textInput: PropTypes.element,
        textInputStyle: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = { text: '测试一下' };
    }

    render() {
        return (
            <View style={[styles.container, this.props.textFieldStyle]}>
                <View style={[styles.defaultLeftView, this.props.leftViewStyle]}>
                    {this.props.leftView}
                </View>
                {this.props.textInput ? this.props.textInput :
                    <TextInput
                        style={this.props.textInputStyle}
                        onChangeText={(text) => this.setState({ text })}
                        clearButtonMode={'while-editing'}
                        value={this.state.text}
                    />}
                <View style={[styles.defaultRightView, this.props.rightViewStyle]}>
                    {this.props.rightView}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    defaultLeftView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    defaultRightView: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});