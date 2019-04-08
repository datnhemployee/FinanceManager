import RenderSet from '../../../../utils/RenderSet';

// #region 
// @author Dat
const Set = new RenderSet();
const TradingOff = {
    ...RenderSet.default(),
    AddPictureButton: Set.next(),
    NavigationButton: Set.next(),
    AddNoteButton: Set.next(),
}

export default {
    ...TradingOff,
    ...{

    }
};

// #endregion
