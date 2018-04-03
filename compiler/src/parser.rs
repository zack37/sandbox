use lexer::Token;

#[derive(Debug)]
struct Constant { value: i32 }
#[derive(Debug)]
struct Expression { value: Constant }
#[derive(Debug)]
struct Return { value: Expression }
#[derive(Debug)]
struct Statement { value: Return }
#[derive(Debug)]
struct Function { name: String, value: Statement }
#[derive(Debug)]
struct FunctionDeclaration { value: Function }
#[derive(Debug)]
struct Program { value: FunctionDeclaration }

pub fn parse(tokens: Vec<Token>) {}
