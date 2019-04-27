import { gap } from "../utils/DateConvert";

export default class Total {
    constructor () {}
    static default () {
        let dateID = gap({}).date();
        let monthID = gap({}).date();
        let yearID = gap({}).date();
        return {
            year: yearID,
            yearTotal: 0,
            monthlyTotal: [
                {
                    _id: monthID,
                    total: 0,
                    types: [
                        {
                            _id: 0,
                            total: 0,
                            spenses: {
                            }
                        }
                    ],
                    dailyTotal: [
                        {
                            _id: dateID,
                            total: 0,
                            types: [
                                {
                                    _id: 0,
                                    total: 0,
                                    isIncome: false,
                                    spenses: [{
                                        
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