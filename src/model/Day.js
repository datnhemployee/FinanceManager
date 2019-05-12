import { getID } from "../utils/DateConvert";

export default class Day {
    constructor () {}
    static default (dayID = getID().day()) {
        return {
            dayID: dayID,
            total: 0,
            typeList: [
                // {
                //     ID: 0,
                //     total: 0,
                //     spenseList: []
                // }
            ]
        }
    }
}