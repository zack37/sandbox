#[macro_use]
extern crate clap;
#[macro_use]
extern crate lazy_static;
extern crate regex;

mod conversion;
mod temperature;

use clap::{Arg, ArgMatches, SubCommand};
use conversion::Conversion;
use regex::Regex;
use temperature::{Temperature, TemperatureUnit};

macro_rules! regex {
    ($re:expr) => {
        Regex::new($re).unwrap()
    };
}
macro_rules! capture {
    ($cap:expr, $group: expr, $type:ty) => {
        (&$cap[$group]).parse::<$type>().unwrap()
    };
}


fn convert_temperature<'a>(temp_matches: &'a ArgMatches) {
    let input = temp_matches
        .value_of("INPUT")
        .expect("Must supply a number with a suffix of F, C, K, or R");
    let to = value_t_or_exit!(temp_matches, "CONVERT_TO", TemperatureUnit);

    let captures = TEMPERATURE_RE
        .captures(input)
        .expect(&format!("Invalid input: {}", input));

    let (value, unit) = (
        capture!(captures, "value", f64),
        capture!(captures, "unit", TemperatureUnit),
    );

    let temp = Temperature::new(value, unit);
    let result = temp.convert_to(to);

    println!("{} = {}", temp, result);
}

fn main() {
    let matches = app_from_crate!()
        .subcommand(
            SubCommand::with_name("temperature")
                .about("convert temperature from one unit to another")
                .arg(
                    Arg::with_name("INPUT")
                        .help("Must be a number with a suffix of F, C, K, or R")
                        .required(true)
                        .index(1),
                ).arg(
                    Arg::with_name("CONVERT_TO")
                        .short("c")
                        .long("convert-to")
                        .takes_value(true)
                        .help("Suffix to convert to")
                        .possible_values(&["F", "C", "K", "R"])
                        .case_insensitive(true)
                        .default_value("F"),
                ),
        ).get_matches();

    match matches.subcommand() {
        ("temperature", Some(temp_matches)) => {
            convert_temperature(temp_matches);
        }
        _ => unreachable!(),
    };
}
