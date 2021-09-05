// babel-traverse is used for updating or removing our nodes in AST

const traverse = require("@babel/traverse").default;
const parser = require("@babel/parser");

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

traverse(ast, {
  enter(path) {
    if (path.isIdentifier({ name: "n" })) {
      path.node.name = "x";
    }
  },
});
