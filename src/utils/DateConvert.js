
export const Country = {
    default: 0,
    VN: 1,
}


export const format = (
    country = Country.default, 
    day = 4,
    month = 5,
    year = 2019,
    ) => {
    if(country===null) throw new Error('the country should not be null');
    const DateType = {
        [Country.default]: `${day} tháng ${month}, ${year}`,
        [Country.VN]: `${day} tháng ${month}, ${year}`,
    }
    return DateType[country];
}

export const getID = (
    present = new Date(), 
    previous = new Date(2019,3,5),
) => {
    if(!present 
        || present === null
        || previous === null) {
            return null;
    } 
    return {
        day () {
            let res = Math.abs(present - previous) / 1000;
            return Math.floor(res / 86400);
        },
        month () {
            let res = (present.getFullYear() - previous.getFullYear()) * 12;
            res = res - previous.getMonth();
            res = res + present.getMonth();
            return res <= 0 ? 0: res;
        },
        year () {
            return (present.getFullYear() - previous.getFullYear());
        },
    }
}

export const getDatesFromID = (dateID = 0) => {
    let res = new Date(2019,3,5 + dateID);
    return {
        day: res.getDate(),
        month: res.getMonth(),
        year: res.getFullYear(),
    }
}
