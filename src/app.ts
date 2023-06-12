import _ from "lodash";
//there are translation types packages they usually come with .dts they exist for popular third party libraries, they translate the js version of the code to its ts equivalent. search for the library name and include types
console.log(_.shuffle([1, 2, 3, 4, 5, 6]));

// when you have a library that doesnt have types or js you include in a script tag in your html code. you use 'declare' keyword and include the name and its output
