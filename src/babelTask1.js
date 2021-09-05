// Task 1
// In this task we'll be removing console.log() from our code with the help of babel plugin.

const babel = require("@babel/core");
const types = require("@babel/types");

// Sample piece of code which we'll use
const code = `function sum (a,b) {
    console.log(a,b);
    otherFunction();
    return a+b;
}
`;

function removeConsoleLog() {
  return {
    visitor: {
      CallExpression(path, state) {
        if (types.isIdentifier(path.node.callee.object, { name: "console" })) {
          // This will only remove console
          path.remove();
        }
      },
    },
  };
}

const output = babel.transformSync(code, {
  plugins: [
    // Write plugin function here
    removeConsoleLog(),
  ],
});

console.log(output.code);
