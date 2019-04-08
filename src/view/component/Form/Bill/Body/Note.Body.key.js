import RenderSet from '../../../../utils/RenderSet';

// #region 
// @author Dat
const Set = new RenderSet();
const TradingOff = {
    ...RenderSet.default(),
    NoteForm: Set.next(),
    BillForm: Set.next(),
}

export default {
    ...TradingOff,
    ...{

    }
};

// #endregion
