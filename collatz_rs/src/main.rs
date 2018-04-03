#![feature(generators, generator_trait, use_nested_groups)]

extern crate rayon;

use rayon::prelude::*;
use std::ops::{Generator, GeneratorState::{Complete}};

fn collatz_count_generator(i: usize) -> (usize, usize) {
    let mut generator = ||{
        let mut count = 1usize;
        let mut current = i;
        while current != 1 {
            yield current;
            if current % 2 == 0 {
                count += 1;
                current /= 2;
            } else {
                count += 2;
                current = (3 * current + 1) / 2;
            }
        }

        yield 1;

        (count, i)
    };

    loop {
        if let Complete(count) = generator.resume() {
            return count;
        }
    }
}

fn main() {
    let ( count, num ) = (1..1_000_000_usize)
        .into_par_iter()
        .map(collatz_count_generator)
        .max_by_key(|&(count, _)| count)
        .unwrap();

    println!("The largest collatz chain under 1mil is {} with a length of {}", num, count);
}
