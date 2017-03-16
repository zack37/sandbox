#![cfg_attr(feature="clippy", feature(plugin))]
#![cfg_attr(feature="clippy", plugin(clippy))]

extern crate greprs;

use std::io::prelude::*;
use greprs::run;
use greprs::config::Config;

fn main() {
    let mut stderr = std::io::stderr();
    let config = Config::new();
    if let Err(e) = run(config) {
        writeln!(&mut stderr, "Application error: {}", e).expect("Could not write to stderr");
        std::process::exit(1);
    }
}
