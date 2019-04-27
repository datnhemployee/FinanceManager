import ConstantValue from "../constant/ConstantValue";

export const Country = {
    default: 0,
    VN: 1,
}


export const format = ({
    country = Country.default, 
    day = 4,
    month = 5,
    year = 2019,
    } = {}) => {
    if(country===null) throw new Error('the country should not be null');
    const DateType = {
        [Country.default]: `${day} tháng ${month}, ${year}`,
        [Country.VN]: `${day} tháng ${month}, ${year}`,
    }
    return DateType[country];
}

export const gapDate = (
    first = new Date(), 
    second = ConstantValue.DEFAULT_DATE,
    ) => {
    if(!first 
        || first === null
        || second === null) {
            return null;
    }   
    let res = Math.abs(first - second) / 1000;
    return Math.floor(res / 86400);
}

export const gapMonth = (
    first = new Date(), 
    second = ConstantValue.DEFAULT_DATE,
    ) => {
    if(!first 
        || first === null
        || second === null) {
            return null;
    }   
    let res = (first.getFullYear() - second.getFullYear()) * 12;
    res = res - second.getMonth() + 1;
    res = res + first.getMonth();
    return res <= 0 ? 0: res;
}

export const gapYear = (
    first = new Date(), 
    second = ConstantValue.DEFAULT_DATE,
    ) => {
    if(!first 
        || first === null
        || second === null) {
            return null;
    }   
    return (first.getFullYear() - second.getFullYear());
}
