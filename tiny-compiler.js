const R = require('ramda');

const whitespace = /\s/;
const numbers = /\d/;
const letters = /[a-z]/i;

const tokenizer = input => {
  console.log('tokenizing', input);

  let current = 0;
  const tokens = [];

  while (current < input.length) {
    let char = input[current];

    if (char === '(' || char === ')') {
      tokens.push({ type: 'paren', value: char });
      current++;
    } else if (whitespace.test(char)) {
      current++;
    } else if (numbers.test(char)) {
      let value = '';
      while (numbers.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'number', value });
    } else if (char === '"') {
      let value = '';
      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push({ type: 'string', value });
    } else if (letters.test(char)) {
      let value = '';
      while (letters.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'name', value });
    } else {
      throw new Error(`I don't know what this character is: ${char}`);
    }
  }

  return tokens;
};

const parser = tokens => {
  console.log('parsing', tokens);

  let current = 0;

  function walk() {
    let token = tokens[current];

    if (token.type === 'number') {
      current++;
      return { type: 'NumberLiteral', value: token.value };
    }
    if (token.type === 'string') {
      current++;
      return { type: 'StringLiteral', value: token.value };
    }
    if (token.type === 'name') {
      current++;
      return { type: 'Identifier', value: token.value };
    }
    if (token.type === 'paren' && token.value === '(') {
      token = tokens[++current];
      const node = { type: 'CallExpression', name: token.value, params: [] };

      token = tokens[++current];

      while (
        token.type !== 'paren' ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk());
        token = tokens[current];
      }

      current++;

      return node;
    }

    throw new TypeError(token.type);
  }

  const ast = {
    type: 'Program',
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
};

const traverser = (ast, visitor) => {
  function traverseArray(array, parent) {
    array.forEach(child => traverseNode(child, parent));
  }

  const traverseMap = {
    Program: node => traverseArray(node.body, node),
    CallExpression: node => traverseArray(node.params, node),
    NumberLiteral: () => {},
    StringLiteral: () => {},
    Identifier: () => {},
  };

  function traverseNode(node, parent) {
    const methods = visitor[node.type];
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    const traverseType = traverseMap[node.type];
    if (!traverseType) {
      throw new TypeError(node.type);
    }
    traverseType(node);

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  traverseNode(ast, null);
};

const transformer = ast => {
  const newAst = {
    type: 'Program',
    body: [],
  };

  ast._context = newAst.body;

  traverser(ast, {
    NumberLiteral: {
      enter: (node, parent) => {
        parent._context.push({ type: 'NumberLiteral', value: node.value });
      },
    },

    StringLiteral: {
      enter: (node, parent) => {
        parent._context.push({ type: 'StringLiteral', value: node.value });
      },
    },

    CallExpression: {
      enter: (node, parent) => {
        let expression = {
          type: 'CallExpression',
          callee: { type: 'Identifier', name: node.name },
          arguments: [],
        };

        node._context = expression.arguments;

        if (parent.type !== 'CallExpression') {
          expression = { type: 'ExpressionStatement', expression };
        }

        parent._context.push(expression);
      },
    },
  });

  return newAst;
};

const codeGenerator = node => {
  const codeGeneratorMap = {
    Program: R.pipe(
      R.prop('body'),
      R.map(codeGenerator),
      R.join('\n'),
    ),
    ExpressionStatement: node => codeGenerator(node.expression) + ';',
    CallExpression: node =>
      `${codeGenerator(node.callee)}(${R.map(
        codeGenerator,
        node.arguments,
      ).join(', ')})`,
    Identifier: node => node.name,
    NumberLiteral: node => node.value,
    StringLiteral: node => `"${node.value}"`,
  };
  const exp = codeGeneratorMap[node.type];
  if (!exp) {
    throw new Error(node.type);
  }
  return exp(node);
};

const compiler = R.pipe(
  tokenizer,
  parser,
  transformer,
  codeGenerator,
);

module.exports = {
  tokenizer,
  parser,
  traverser,
  transformer,
  codeGenerator,
  compiler,
};

console.log(compiler('(add 2 subtract(4 2))'));
