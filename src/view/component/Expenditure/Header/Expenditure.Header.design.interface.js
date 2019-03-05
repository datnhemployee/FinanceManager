import FunctionController from '../../../../utils/FunctionController'

/**
 * @author Dat
 * @Date 3/3/2018
 * @tag `Unchangable`
 */
let Name = new FunctionController(
    0.1,
    [
        'Dat',
    ],
);
/**
 * @description To render
 * `left icon` to go to the previous month
 * 
 * @param #none
 * @returns React.Component
 */
Name.register('renderLeftComponent');
/**
 * @description To render
 * `right icon` to go to the next month
 * 
 * @param #none
 * @returns React.Component
 */
Name.register('renderRightComponent');
/**
 * @description To render 
 * `month` the present month.
 * `remainder` the left days of the month
 * 
 * @param month: the present month, `default`: Tháng ...
 * @param remainder: the left days of the month, `default`: chưa có hạn mức chi
 * @returns React.Component
 */
Name.register('renderMidComponent');
/**
 * @description To render the left components
 * 
 * @param title: the title of the screen, `default`: Hạn mức chi
 * @returns React.Component
 */
Name.register('renderTitle');
/**
 * @description To render the left components
 * 
 * @param month: the present month
 * @param remainder: the left days of the month
 * @param title: the title of the screen
 * @returns React.Component
 */
Name.register('render');

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