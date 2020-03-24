#![feature(iterator_step_by)]

extern crate rayon;
extern crate time;

use rayon::prelude::*;
use time::PreciseTime;

fn is_perfect(n: &usize) -> bool {
    // get factors
    let (upper, step) = if n % 2 == 0 { (n / 2, 1) } else { (n / 3, 2) };
    (1..upper + 1)
        .step_by(step)
        .filter(|&x| n % x == 0)
        .sum::<usize>()
        == *n
}

fn main() {
    let start = PreciseTime::now();

    let perfect_numbers: Vec<usize> = (2..1_000_000_usize)
        // .into_par_iter()
        .into_iter()
        .filter(is_perfect)
        .collect();

    let elapsed = start.to(PreciseTime::now());

    println!("{:?}", perfect_numbers);

    println!("perfectNumbers: {}", elapsed);
}
