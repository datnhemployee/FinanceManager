import { gap } from "../utils/DateConvert";

export default class Total {
    constructor () {}
    static default () {
        let dayID = gap().date();
        let monthID =  gap().month();
        let yearID =  gap().year();
        return {
            _id: yearID,
            total: 0,
            typeList: [
                {
                    _id: 0,
                    total: 0,
                    spenseList: [{

                    }]
                }
            ],
            monthlyList: [
                {
                    _id: monthID,
                    total: 0,
                    typeList: [
                        {
                            _id: 0,
                            total: 0,
                            spenseList: [{

                            }]
                        }
                    ],
                    dailyList: [
                        {
                            _id: dayID,
                            total: 0,
                            typeList: [
                                {
                                    _id: 0,
                                    total: 0,
                                    spenseList: [{
                                        
                                    }]
                                }
                            ]
                        }
                    ],
                }
            ],
            
        }
    }
}