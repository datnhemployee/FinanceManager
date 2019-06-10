
import React, { Component } from 'react';
import { 
    TextInput,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TouchableNativeFeedback,
} from 'react-native';
import styles, { substyles } from './Card.style';
import params from './Card.default';
import { getDatesFromID, format } from '../../../utils/DateConvert';
import Typeface from '../../../styles/Font';
import Color, { RBGColor } from '../../../styles/Color'
import PieChart from '../PieChart/PieChart';
import SnipetType from '../SnipetType/SnipetType';
import Type from '../../../model/Type';
import TypeController from '../../../controller/TypeController';

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
            typeList: [Type.default()]
        }
    }

    async componentDidMount () {
        let {
            typeList,
        } = this.getProps();
        let temp = [];
        typeList.forEach(async (val)=> {
            temp.push(await TypeController.getByName(val.name));
            this.setState({typeList: temp});
        })
        // console.log(JSON.stringify(temp))
    }
    getProps () {
        let {
            dayID,
            // = params.defaultDateID,
            total = params.defaultTotal,
            typeList = params.defaultType,
            onClick,
        } = this.props;
        return {
            dayID,
            total,
            typeList,
            onClick,
        }
    }
    dateLable () {
        let {
            dayID, 
        } = this.getProps();
        let localStyle = substyles.header;
        let {
            day,
            month,
            year,
        } = getDatesFromID(dayID);

        let date = Typeface.toCase({
            text: format(0,day,month +1,year),
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
                {color: total >= 0 ? Color.DarkGreen: Color.Red}]}>
                {Typeface.toCase({
                    text: total + '',
                    type: Typeface.type.default,    
                })}
            </Text>
        )
    }

    pieChart () {
        let {
            dayID,
            total,
            typeList,
            onClick,
        } = this.getProps();

        let totalInDate = 0;
        let SpentTypesList = typeList.slice();
        let i = 0;
        while(i < SpentTypesList.length) {
            if(!SpentTypesList[i].isIncome){
                totalInDate = totalInDate + SpentTypesList[i].total;
                i++;
            } else {
                SpentTypesList.splice(i,1);
            }
        }
        SpentTypesList = SpentTypesList.filter((val) => val.total != 0).slice();
        const isEmpty = SpentTypesList.length == 0;
        
        const isDefault = ((SpentTypesList.length == 1)
            &&(SpentTypesList[0].spenseList.length === 0));

        // console.log("spend type list : " + JSON.stringify(SpentTypesList));
        let allType = TypeController.getAll();
        allType = allType.content.filter((val) => !val.isIncome);

        let data = isEmpty || isDefault ? 
            undefined:
            SpentTypesList.map((e,i) => {
                let amount = Math.abs(e.total / totalInDate);
                let color = allType.findIndex((val)=>val.name === e.name);
                if (color === -1) {
                    return null;
                } else {
                    color = allType[color].color;
                }

                //let tempType = this.state.typeList.find((val)=>val.name==e.name);
                // let colorFrame = RBGColor.Red;
                // colorFrame.B = (e.total + colorFrame.G) % 255;
                // colorFrame.G = (e.total + colorFrame.G) % 255;
                return {
                    key: i ,
                    amount: !amount ? 100: amount,
                    svg: { fill: color},
                    //svg: { fill: tempType? tempType.color:Color.Gray},
                }
            })
        // console.log("data :" + JSON.stringify(data));
        if(!!data) {
            data = data.filter((val) => !!val);
            if(data.length === 0) {
                return (
                <Text style={{
                        flex: 1,
                        ...Typeface.header[5],
                        textAlign: 'center',
                        textAlignVertical: 'center',
                    }}
                    onPress= {() => {
                        onClick({
                            dayID: dayID,
                            total,
                            typeList,
                    })}}
                    >Chưa chi gì trong ngày
                </Text>
                )
            }
        } 
        
        return (
            <TouchableOpacity
                onPress= {() => {
                    onClick({
                        dayID: dayID,
                        total,
                        typeList,
                    })}}>
                <PieChart 
                    data={data}>
                </PieChart>
            </TouchableOpacity>
            
        )
    }

    listType () {
        let {
            typeList,
        } = this.getProps();
        let localStyle = substyles.footer;
        
        let SpentTypesList = typeList.slice();

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
                {typeList.map((e,i)=>{
                    return (
                        // <Text >{e.name}</Text>
                        <SnipetType 
                            style= {localStyle.snipet}
                            key = {'SnipetType' + i}
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





