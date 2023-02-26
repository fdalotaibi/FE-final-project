// Import the js file to test
import { getData } from "../client/js/nameChecker"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the getData functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the getData() function", () => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        expect(getData).toBeDefined();     
    })

    test('Should identify if the getData function was called or not', () => {
        const getData = jest.fn();
        getData();
        expect(getData).toHaveBeenCalled();
     });
});
