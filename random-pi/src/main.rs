extern crate gcd;
extern crate rand;
extern crate time;

use gcd::Gcd;
use rand::Rng;
use rand::distributions::{IndependentSample, Range};
use std::f32::consts::PI;
use time::PreciseTime;

const TRIALS: u32 = 10_000_000;
const MIN: u16 = 1;
const MAX: u16 = 10_000;

pub fn calculate_pi() {
    let mut rng = rand::weak_rng();
    let between = Range::new(MIN, MAX);
    let start_time = PreciseTime::now();

    let coprime_count = (1..TRIALS)
        .map(|_| {
            (between.ind_sample(&mut rng), between.ind_sample(&mut rng))
        })
        .filter(|&(a, b)| a.gcd(b) == 1)
        .count();

    let step = (coprime_count as f32) / (TRIALS as f32);
    let result = (6.0 / step).sqrt();
    let end = start_time.to(PreciseTime::now());
    println!("Calculation took: {}ms", end.num_milliseconds());
    println!("Estimated PI = {:.10}", result);
    println!(
        "Difference of PI = {:.10} - {:.10} = {:.10}",
        PI,
        result,
        PI - result
    );
}

fn main() {
    calculate_pi();

    let rand_string: String = rand::thread_rng().gen_ascii_chars().take(30).collect();

    println!("new password {}", rand_string);
}
