import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
    Image,
} from 'react-native';
import Icon from '../../styles/Icon';

export class LocalImage extends Component {
    constructor (props) {
        super (props);
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
                    source={require(uri)}
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
