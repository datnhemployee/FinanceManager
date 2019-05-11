import { gap } from "../utils/DateConvert";

export default class Total {
    constructor () {}
    static default () {
        let dayID = gap().day();
        let monthID =  gap().month();
        let yearID =  gap().year();
        return {
            Id: yearID,
            total: 0,
            typeList: [
                {
                    Id: 0,
                    total: 0,
                    spenseList: []
                }
            ],
            monthlyList: [
                {
                    Id: monthID,
                    total: 0,
                    typeList: [
                        {
                            Id: 0,
                            total: 0,
                            spenseList: []
                        }
                    ],
                    dailyList: [
                        {
                            Id: dayID,
                            total: 0,
                            typeList: [
                                {
                                    Id: 0,
                                    total: 0,
                                    spenseList: []
                                }
                            ]
                        }
                    ],
                }
            ],
            
        }
    }
}