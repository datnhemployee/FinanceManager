
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Picker,
    View,
} from 'react-native';
import Icon from '../../styles/Icon';

const defaultProps = {
    name: 'TextInput',
    sercureTextEntry: false,
    placeholder: 'Chạm để nhập...',
}

export default class HomeHeader extends Component {
    constructor (props) {
        super(props);

        this.renderLeftComponent = this.renderLeftComponent.bind(this);
        this.renderMidComponent = this.renderMidComponent.bind(this);
        this.renderRightComponent = this.renderRightComponent.bind(this);
    }
    renderLeftComponent () {
        return (
            <View style={styles.leftComponent}>
                {Icon.UserIcon(Icon.IconSize.Huge)}
            </View>
        );
    }

    renderMidComponent () {
        let {
            options,
            selected,
            budget,
        } = this.props;

        return (
            <View style={styles.leftComponent}>
                <Text style={styles.budgetTitle}
                > Tổng dư </Text>
                <Picker style={styles.budgetTitle}
                    selectedValue={selected}> 
                    {
                        () => {
                            return options.forEach(element => {
                                return (<Picker.Item label={element.name} value={element.value} />);
                            });
                        }
                    }
                </Picker>
                <Text > {budget} </Text>
            </View>
        );
    }

    renderRightComponent () {
        return (
            <View style={styles.leftComponent}>

            </View>
        );
    }

    render() {
        let {
            avatar = defaultProps.avatar,
            sercureTextEntry = false,
            
        } = this.props;
        return (
        <View style={styles.container}>
            {this.renderLeftComponent()}
            {this.renderMidComponent()}
            {this.renderRightComponent()}
        </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textInputUsername: {
        flex: 1,
        textAlign: 'left'
    },
    textInputPassword: {
        flex: 1,

    },
    leftComponent: {
        flex: 1,

    },
    MidComponent: {
        flex: 1,

    },
    RightComponent: {
        flex: 1,

    },
    
})

