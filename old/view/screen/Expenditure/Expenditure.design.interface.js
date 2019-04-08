import FunctionController from '../../../utils/FunctionController';

/**
 * @author Dat
 * @Date 3/3/2018
 * @tag `Unchangable`
 */
let Name = new FunctionController(
    '0.1',
    'Dat',
);
/**
 * @description To render the left components
 * @returns React.Component
 */
Name.register({name: 'renderFooter'});
/**
 * @description To render the left components
 * @returns React.Component
 */
Name.register({name: 'renderBody'});
/**
 * @description To render the left components
 * @returns React.Component
 */
Name.register({name: 'renderHeader'});
/**
 * @param   title the title of the screen
 * @param   
 * @description To render the left components
 * @returns React.Component
 */
Name.register({name: 'render'});

// **Note: To release new version of the functions 
// Adding new version of the functions shall satisfy the rules below:
//  + Same name: when the version of the new one is from the (version + 0.1) to (version + 0.9)
//  + name[V + 1]: when the version of the new one is more than version + 1) 

//  the next release version should be added here ...
//  e.g: Name = new FunctionController('1.1','Dat');

export default Name.list();