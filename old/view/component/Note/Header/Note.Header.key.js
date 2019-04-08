import RenderSet from '../../../../utils/RenderSet';

// #region 
// @author Dat
const Set = new RenderSet();
const TradingOff = {
    ...RenderSet.default(),
    Exspense: Set.next(),
    ConfirmBar: Set.next(),
    DateLabel: Set.next(),
    NavigationBar: Set.next(),
}

export default {
    ...TradingOff,
    ...{

    }
};

// #endregion
