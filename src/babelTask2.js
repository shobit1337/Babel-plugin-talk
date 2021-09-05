// Task 2
// In this task we'll change the 'n' to any other variable using path properties.
const babel = require("@babel/core");

const code = `
  function square(n){
    return n * n;
  }
`;

function changeParamsName() {
  return {
    visitor: {
      FunctionDeclaration(path, state) {
        path.scope.rename("n", "a");
      },
    },
  };
}

const output = babel.transformSync(code, {
  plugins: [changeParamsName()],
});

console.log(output.code);
