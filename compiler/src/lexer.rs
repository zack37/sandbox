use regex::Regex;

lazy_static! {
    static ref KEYWORDS: Regex = Regex::new(r"int|return").expect("Failed to create keywords regex");
}

#[derive(Debug)]
pub enum Token {
    Unknown(String),
    Semicolon,
    Brace(String),
    Parenthesis(String),
    Keyword(String),
    Ident(String),
    StringLiteral(String),
    IntegerLiteral(String),
}

pub fn lex(code: &'static str) -> Vec<Token> {
    println!("parsing {}", code);

    let mut chars = code.chars();
    let mut tokens:Vec<Token> = vec![];
    let mut current_char = chars.next();

    while current_char != None {
        let mut current = current_char.unwrap();
        if current == '(' || current == ')' {
            tokens.push(Token::Parenthesis(format!("{}", current)));
            current_char = chars.next();
        }
        else if current == '{' || current == '}' {
            tokens.push(Token::Brace(format!("{}", current)));
            current_char = chars.next();
        }
        else if current == ';' {
            tokens.push(Token::Semicolon);
            current_char = chars.next();
        }
        else if current.is_whitespace() {
            current_char = chars.next();
            continue;
        }
        else if current.is_numeric() {
            let mut value = String::new();
            while current.is_numeric() {
                value.push(current);
                current_char = chars.next();
                current = current_char.unwrap();
            }
            tokens.push(Token::IntegerLiteral(value));
        }
        else if current == '"' {
            let mut value = String::new();
            current_char = chars.next();
            current = current_char.unwrap();
            while current != '"' {
                value.push(current);
                current_char = chars.next();
                current = current_char.unwrap();
            }
            tokens.push(Token::StringLiteral(value));
            current_char = chars.next();
        }
        else if current.is_alphabetic() {
            let mut value = String::new();
            while current.is_alphabetic() {
                value.push(current);
                current_char = chars.next();
                current = current_char.unwrap();
            }
            if KEYWORDS.is_match(&value) {
                tokens.push(Token::Keyword(value))
            } else {
                tokens.push(Token::Ident(value));
            }
        }
        else {
            tokens.push(Token::Unknown(format!("{}", current)));
            current_char = chars.next();
        }
    }

    tokens
}
