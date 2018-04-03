#![feature(iterator_step_by)]
#![feature(test)]
#![allow(dead_code)]

#[cfg(test)]
extern crate test;

extern crate num;
extern crate time;
extern crate rayon;
extern crate pbr;

use num::bigint::BigUint;
use time::PreciseTime;

mod primitive;
mod arbitrary;

use primitive::{PrimitivePrimeTestTrait, PrimitivePrimeTest};
use arbitrary::ArbitraryPrimeTest;

fn primitive() {
    let upper = 1000000;
    let prime_count = PrimitivePrimeTest::with_bar(upper).async();
    let ratio: f64 = prime_count as f64 / upper as f64 * 100.0;
    println!("Ratio of primes = {}/{} = {}%", prime_count, upper, ratio);
}

fn arbitrary() {}

fn main() {
    let start = PreciseTime::now();
    primitive();
    let elapsed = start.to(PreciseTime::now());
    println!("Generating primes took {}", elapsed);
}

#[cfg(test)]
mod tests {
    // use super::*;
    // use test::Bencher;
    // use test::black_box;

    // #[bench]
    // fn primitive_prime_bench_sync(b: &mut Bencher) {
    //     let n = black_box(100_000);
    //     b.iter(|| {
    //         PrimitivePrimeTest::new(n).sync();
    //     });
    // }

    // #[bench]
    // fn primitive_prime_bench_async(b: &mut Bencher) {
    //     let n = black_box(100_000);
    //     b.iter(|| {
    //         PrimitivePrimeTest::new(n).async();
    //     });
    // }

    // #[bench]
    // fn arbitrary_prime_bench_sync(b: &mut Bencher) {
    //     let n = black_box(BigUint::parse_bytes(b"100000", 10).unwrap());
    //     b.iter(|| {
    //         ArbitraryPrimeTest::new(n.clone()).sync();
    //     });
    // }

    // #[bench]
    // fn arbitrary_prime_bench_async(b: &mut Bencher) {
    //     let n = black_box(BigUint::parse_bytes(b"100000", 10).unwrap());
    //     b.iter(|| {
    //         ArbitraryPrimeTest::new(n.clone()).async();
    //     });
    // }
}
