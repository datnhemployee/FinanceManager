import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
    Image,
} from 'react-native';
import Icon from '../../styles/Icon';
import { LocalImage } from './LocalImage';
import axios from 'axios'

export class OnlineImage extends LocalImage {
    constructor (props) {
        super (props);
    }

    get defaultAvatar () {
        return Icon.DefaultIcon(
            Icon.IconSize.Intermediate);
    }

    render () {
        let {
            uri,
            imageStyle
        } = this.props;
        return (
            <View
                style= {styles.container}
            >
                <Image 
                    style={[
                        styles.image,
                        imageStyle,
                    ]}
                    source={{uri:uri}}
                    onError={}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    image: {

    }
})
