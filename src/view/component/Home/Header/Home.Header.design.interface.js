import FunctionController from "../../../../utils/FunctionController";

/**
 * @author Dat
 * @Date 3/3/2018
 * @tag `Unchangable`
 */
let Name = new FunctionController(0.1, ["Huyen"]);
/**
 * @description To render
 * `left icon` to go to the previous month
 *
 * @param #none
 * @returns React.Component
 */
Name.register("renderLeftComponent");
/**
 * @description To render
 * `right icon` to go to the next month
 *
 * @param #none
 * @returns React.Component
 */
Name.register("renderRightComponent");
/**
 * * @description To render
 * `right icon` to go to the next month
 *
 * @param #none
 * @returns React.Component
 * @description To render
 * `month` the present month.
 * `remainder` the left days of the month
 *
 * @param month: the present month, `default`: Tháng ...
 * @param remainder: the left days of the month, `default`: chưa có hạn mức chi
 * @returns React.Component
 */
Name.register("renderMidComponent");
/**
 * @description To render the components between 2 arrows
 *
 * @param date: the present date, `default`: Hôm nay
 * @returns React.Component
 */
Name.register("renderBalanceTitle");
/**
 * @description To render top components
 *
 * @param balanceLabel: "Tổng dư"
 * @param currency: the chosen currency, `default`: VNĐ
 * @returns React.Component
 */
Name.register("renderFilter");
/**
 * @description To render filter component
 *
 * @param filter: the chosen filter (month, week, date), `default`:month
 * @returns React.Component
 */
Name.register("render");

// **Note: To release new version of the functions
// Adding new version of the functions shall satisfy the rules below:
/**
 * ```ts
 * let Name = new FunctionController(
 * version: Number,
 * authorList: [String],
 * );
 * ```
 */

//  the next release version should be added here ...
//  e.g:
/**
 * ```ts
 *  Name = new FunctionController(
 * 0.2,
 * [
 *  'Dat',
 *  'Nam',
 *  'Huyen',
 * ],
 * );
 * ```
 */

export default Name.list();
