#[macro_use]
extern crate clap;

pub mod config;

use std::error::Error;
use std::fs::File;
use std::io::prelude::*;
use config::Config;

fn grep<'a>(config: Config, contents: &'a str) -> Vec<&'a str> {
    if config.insensitive {
      contents.lines()
        .filter(|line| line.to_lowercase().contains(&config.search))
        // .map|s| s.to
        .collect()
    }
    else {
      contents.lines()
          .filter(|line| line.contains(&config.search))
          // .map(|s| s.to_string())
          .collect()
    }
}

pub fn run(config: Config) -> Result<(), Box<Error>> {
    let mut file = File::open(&config.filename)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    let matched = grep(config, &contents);
    for line in matched {
        println!("{}", line);
    }

    Ok(())
}

#[cfg(test)]
mod test {
    use super::*;
    use grep;

    #[test]
    fn one_result() {
        let search = Config { search: "duct".to_string(), filename: "na".to_string(), insensitive: false };
        let contents = "
Rust:
safe, fast, productive.
Pick three.";

        assert_eq!(vec!["safe, fast, productive."], grep(search, contents));
    }

    #[test]
    fn case_insensitive() {
        let search = Config { search: "rust".to_string(), filename: "na".to_string(), insensitive: true };
        let contents = "\
Rust:
safe, fast, productive.
Pick three.
Trust me.";
        assert_eq!(vec!["Rust:", "Trust me."],
                   grep(search, contents));
    }
}
