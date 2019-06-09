
import React, { Component } from 'react';
import { 
    View,
} from 'react-native';
import styles, { substyles } from './PieChart.style';
import Color from '../../../styles/Color';
import { PieChart } from 'react-native-svg-charts'
import { Text as TextFromSVG } from 'react-native-svg'

export default class extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
    }

    getProps () {
        let {
            data = [
                {
                    key: 1,
                    amount: 100,
                    svg: { fill: Color.Gray},
                },
            ]
        } = this.props;
        return {
            data,
        };
    }

    render() {
        let {
            data,
        } = this.getProps();

        // const Lables  = ({ slices, height, width }) => {
        //     return slices.map((slice, index) => {
        //         const {
        //             labelCentroid,
        //             pieCentroid,
        //             data,
        //         } = slice
    
        //         return (
        //             <TextFromSVG
        //                 key={index}
        //                 x={pieCentroid[0]}
        //                 y={pieCentroid[1]}
        //                 fill={'white'}
        //                 textAnchor={'middle'}
        //                 alignmentBaseline={'middle'}
        //                 fontSize={20}
        //                 >
        //                 {data.amount}
        //             </TextFromSVG>
        //         )
        //     }) 
        // }

        return (
            <View style={styles.container}>
                <PieChart
                        style={{ 
                            // flex: 1,
                            height: 300, 
                            width: 300,
                            // borderWidth: 1,
                         }}
                        valueAccessor={({ item }) => item.amount}
                        data={data}
                        spacing={0}
                        outerRadius={'95%'}
                        innerRadius={'10%'}
                >
                    {/* <Lables /> */}
                </PieChart>
            </View>
        )
    }
}





