#[macro_use] extern crate lazy_static;
extern crate regex;

mod lexer;
mod parser;

fn main() {
    let tokens = lexer::lex(r"
    int main() {
        return 2;
    }
    ");

    println!("{:?}", tokens);
}
