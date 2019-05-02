
import React, { Component } from 'react';
import { 
    TextInput,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import styles, { substyles } from './Card.style';
import params from './Card.default';
import { getDatesFromID, format } from '../../../utils/DateConvert';
import Typeface from '../../../styles/Font';
import Color, { RBGColor } from '../../../styles/Color'
import PieChart from '../PieChart/PieChart';
import SnipetType from '../SnipetType/SnipetType';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }
    getProps () {
        let {
            dateID = params.defaultDateID,
            total = params.defaultTotal,
            type = params.defaultType,
        } = this.props;

        return {
            dateID,
            total,
            type,
        }
    }
    dateLable () {
        let {
            dateID, 
        } = this.getProps();
        let localStyle = substyles.header;

        let date = Typeface.toCase({
            text: format(getDatesFromID(dateID)),
            type: Typeface.type.default,
        });
        return (
            <Text style={localStyle.dateLable}>
                {date}
            </Text>
        )
    }
    spentLabel () {
        let {
        } = this.getProps();
        let localStyle = substyles.header;
        
        return (
            <Text style={localStyle.spentLabel}>
                {params.spentLabel}
            </Text>
        )
    }

    spentMoney () {
        let {
            total,
        } = this.getProps();
        let localStyle = substyles.header;
        
        return (
            <Text style={[
                localStyle.spentMoney,
                {color: total >= 0 ? Color.Red: Color.DarkGreen}]}>
                {Typeface.toCase({
                    text: total + ' đ',
                    type: Typeface.type.default,    
                })}
            </Text>
        )
    }

    pieChart () {
        let {
            type,
        } = this.getProps();

        let totalInDate = 0;
        let SpentTypesList = type.slice();

        let i = 0;
        while(i < SpentTypesList.length) {
            if(!SpentTypesList[i].isIncome){
                totalInDate = totalInDate + SpentTypesList[i].total;
                i++;
            } else {
                SpentTypesList.splice(i,1);
            }
        }

        const isEmpty = SpentTypesList.length == 0;
        const isDefault = ((SpentTypesList.length == 1)
            &&(SpentTypesList[0].spenses.length === 0));

        const data = isEmpty || isDefault ? 
            undefined:
            SpentTypesList.map((e,i) => {
                let amount = e.total / totalInDate;

                // let colorFrame = RBGColor.Red;
                // colorFrame.B = (e.total + colorFrame.G) % 255;
                // colorFrame.G = (e.total + colorFrame.G) % 255;
                return {
                    key: i ,
                    amount: !amount ? 100: amount,
                    svg: { fill: Color.Red},
                }
            })

        return (
            <PieChart 
            data={data}/>
        )
    }

    listType () {
        let {
            type,
        } = this.getProps();
        let localStyle = substyles.footer;
        
        let SpentTypesList = type.slice();

        let i = 0;
        while(i < SpentTypesList.length) {
            if(!SpentTypesList[i].isIncome){
                i++;
            } else {
                SpentTypesList.splice(i,1);
            }
        }
        // console.log('SpentTypesList',JSON.stringify(SpentTypesList))
        const isEmpty = SpentTypesList.length == 0;
        if (!isEmpty) SpentTypesList = params.defaultType;
        return (
            <ScrollView 
                contentContainerStyle={localStyle.scrollView}
                horizontal={true}>
                {type.map((e,i)=>{
                    return (
                        // <Text >{e.name}</Text>
                        <SnipetType 
                            style= {localStyle.snipet}
                            key = {e.name+e.total+i}
                            name = {e.name}
                            total = {e.total}/>
                    )
                })}
            </ScrollView>
        )
    }

    header () {
        return (
            <View style={styles.header}>
                {this.dateLable()}
                {this.spentLabel()}
                {this.spentMoney()}
            </View>
        );
    }

    body () {
        let {
        } = this.props;
        return (
            <View style={styles.body}>
                {this.pieChart()}
            </View>
        );
    }

    footer () {
        return (
            <View style={styles.footer}>
                {this.listType()}
            </View>
        );
    }

    render() {
        let {
        } = this.props;

        return (
            <View style={styles.container}>
                {this.header()}
                {this.body()}
                {this.footer()}
            </View>
        )
    }
}





