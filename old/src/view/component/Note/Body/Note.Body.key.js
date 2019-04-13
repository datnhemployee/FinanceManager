import RenderSet from '../../../../utils/RenderSet';

// #region 
// @author Dat
const Set = new RenderSet();
const TradingOff = {
    ...RenderSet.default(),
    Pager: Set.next(),
    DateText: Set.next(),
}

export default {
    ...TradingOff,
    ...{

    }
};

// #endregion
