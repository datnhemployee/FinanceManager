import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Modal, Dimensions } from 'react-native';
import styles from './DashboardStyle'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import SLIcon from 'react-native-vector-icons/SimpleLineIcons'
import { PieChart } from 'react-native-svg-charts'
import { Text as TextFromSVG } from 'react-native-svg'
import AddMoney from './AddMoney'

export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addMoneyVisible: false,
        }
    }

    openAddMoney = () => {
        this.setState({ addMoneyVisible: true });
    }

    closeAddMoney = () => {
        this.setState({ addMoneyVisible: false });
    }

    render() {
        const data = [
            {
                key: 1,
                amount: 10,
                svg: { fill: '#600080' },
            },
            {
                key: 2,
                amount: 10,
                svg: { fill: '#9900cc' }
            },
            {
                key: 3,
                amount: 10,
                svg: { fill: '#c61aff' }
            },
            {
                key: 4,
                amount: 15,
                svg: { fill: '#d966ff' }
            },
            {
                key: 5,
                amount: 55,
                svg: { fill: '#ecb3ff' }
            }
        ]

        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <TextFromSVG
                        key={index}
                        x={pieCentroid[0]}
                        y={pieCentroid[1]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={20}
                        // stroke={'black'}
                        // strokeWidth={0.2}
                        >
                        {data.amount}
                    </TextFromSVG>
                )
            })
        }
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.info_text_left}>Số dư</Text>
                    <Text style={styles.info_text_right}>3.000.000 đ</Text>
                    
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.info_text_left}>Đã chi trong ngày</Text>
                    <Text style={styles.info_text_right}>50.000 đ</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderBottomWidth: 1 }}>
                    <Text style={styles.title_text}>02/12/1997</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.title_text}>Chi tiêu</Text>
                </View>
                <View style={{ flex: 10}}>
                    <PieChart
                        style={{ height: 300, borderWidth: 1 }}
                        valueAccessor={({ item }) => item.amount}
                        data={data}
                        spacing={0}
                        outerRadius={'95%'}
                    >
                        <Labels />
                    </PieChart>
                </View>
                <View style={{ flex: 2, backgroundColor: 'lightpink' }}></View>
                <Modal
                    visible={this.state.addMoneyVisible}
                    animationType='slide'
                    onRequestClose={()=>{}}
                >
                    <AddMoney
                    closeAddMoney = {this.closeAddMoney}
                    />
                </Modal>
                <TouchableOpacity 
                    onPress={()=>{this.openAddMoney()}} 
                    style={{ 
                        width: 20, 
                        height: 20, 
                        borderRadius: 10, 
                        backgroundColor: '#00CC00', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        marginLeft: 5,
                        bottom: 0,
                        // left: 0,
                        right: - Dimensions.get('screen').width + 40,
                        // top: 0,
                        }}>
                    <FAIcon name='plus' size={13} color='#ffffff' />
                </TouchableOpacity>
            </View>
        )
    }
}
