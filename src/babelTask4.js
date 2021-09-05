// Task 4

// In this task we'll be creating a new syntax very similar to pair in c++ using babel-plugin.
// Pair (for reference) - https://www.cplusplus.com/reference/utility/pair/

const babel = require("@babel/core");
const code = 'const car = pair(`${model}` , "speed")';

console.log(code);

function typeCheckAndReturn(node, i) {
  let value;
  if (
    node.arguments[i].type === "StringLiteral" ||
    node.arguments[i].type === "Literal"
  ) {
    value = `'${node.arguments[i].extra.rawValue}'`;
  } else if (node.arguments[i].type === "TemplateLiteral") {
    value = node.arguments[i].expressions[0].name;
  } else {
    value = node.arguments[i].name;
  }
  return value;
}
const { types } = babel;

const output = babel.transformSync(code, {
  plugins: [
    function pairPlugin() {
      return {
        visitor: {
          CallExpression(path) {
            const { node } = path;
            if (types.isIdentifier(node.callee, { name: "pair" })) {
              if (node.arguments) {
                if (node.arguments.length !== 2) {
                  return "Number of arguments passed in pair should be equal to 2";
                } else {
                  // For first parameter;
                  let first = typeCheckAndReturn(node, 0);
                  // For second parameter
                  let second = typeCheckAndReturn(node, 1);
                  path.replaceWith(
                    babel.template.expression.ast(
                      `{first: ${first}, second: ${second}}`
                    )
                  );
                  path.skip();
                }
              }
            }
          },
        },
      };
    },
  ],
});

console.log(output.code);
