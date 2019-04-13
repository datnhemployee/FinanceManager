
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