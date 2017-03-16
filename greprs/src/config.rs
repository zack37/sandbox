use clap::{App, Arg};

#[derive(Debug, Default)]
pub struct Config {
    pub search: String,
    pub filename: String,
    pub insensitive: bool
}

#[allow(unreachable_patterns)]
impl Config {
    pub fn new() -> Config {
        let args = App::new(env!("CARGO_PKG_NAME"))
            .version(crate_version!())
            .author(crate_authors!())
            .about(env!("CARGO_PKG_DESCRIPTION"))
            .arg(Arg::with_name("insensitive")
                .short("i")
                .long("insensitive")
                .help("case insensitive search")
                .takes_value(false))
            .arg(Arg::with_name("line-numbers")
                .short("l")
                .long("line-numbers")
                .help("include line numbers in result")
                .takes_value(false))
            .arg(Arg::with_name("search-term")
                .help("the search term")
                .index(1)
                .required(true))
            .arg(Arg::with_name("filename")
                .help("Filename of text to search through")
                .index(2)
                .required(true))
            .get_matches();

        Config {
            search: value_t!(args, "search-term", String).unwrap(),
            filename: value_t!(args, "filename", String).unwrap(),
            insensitive: args.is_present("insensitive")
        }
    }
}
