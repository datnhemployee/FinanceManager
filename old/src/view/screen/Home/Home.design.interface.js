import FunctionController from "../../../utils/FunctionController";

/**
 * @author Huyen
 * @Date 9/3/2018
 * @tag `Unchangable`
 */
let Name = new FunctionController("0.1", "Huyen");
/**
 * @description To render the left components
 * @returns React.Component
 */
Name.register("renderFooter");
/**
 * @description To render the left components
 * @returns React.Component
 */
Name.register("renderBody");
/**
 * @description To render the left components
 * @returns React.Component
 */
Name.register("renderHeader");
/**
 * @param   title the title of the screen
 * @param
 * @description To render the left components
 * @returns React.Component
 */
Name.register("render");

// **Note: To release new version of the functions
// Adding new version of the functions shall satisfy the rules below:
//  + Same name: when the version of the new one is from the (version + 0.1) to (version + 0.9)
//  + name[V + 1]: when the version of the new one is more than version + 1)

//  the next release version should be added here ...
//  e.g: Name = new FunctionController('1.1','Dat');

export default Name.list();
