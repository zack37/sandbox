use pbr::ProgressBar;
use std::time::Duration;
use std::sync::{Arc, Mutex};
use std::io::Stdout;
use rayon::prelude::*;

fn _is_prime_primitive(potential_prime: usize) -> bool {
    if potential_prime == 2 || potential_prime == 3 || potential_prime == 5 {
        return true;
    }
    if potential_prime < 5 {
        return false;
    }

    if potential_prime % 2 == 0 || potential_prime % 3 == 0 {
        return false;
    }

    let sqrt = (potential_prime as f64).sqrt() as usize;

    (5..sqrt + 1).step_by(2).all(|i| potential_prime % i != 0)
}

fn _is_prime_jumping(p: usize) -> bool {
    if p <= 1 {
        return false;
    }
    if p == 2 || p == 3 {
        return true;
    }
    if p % 2 == 0 || p % 3 == 0 {
        return false;
    }

    let mut i = 5;
    let mut w = 2;

    while i * i <= p {
        if p % i == 0 {
            return false;
        }

        i = i + w;
        w = 6 - w;
    }

    true
}

fn least_factor(n: usize) -> usize {
    if n == 0 {
        return 0;
    }
    if n % 1 != 0 || n * n < 2 {
        return 1;
    }
    if n % 2 == 0 {
        return 2;
    }
    if n % 3 == 0 {
        return 3;
    }
    if n % 5 == 0 {
        return 5;
    }
    let m = (n as f64).sqrt() as usize;
    let adders: [usize; 8] = [0, 4, 6, 10, 12, 16, 22, 24];
    for i in (7..m + 1).step_by(30) {
        if let Some(adder) = adders.iter().find(|&x| n % (i + x) == 0) {
            return i + adder;
        }
    }
    return n;
}

fn _is_prime_least_factor(n: usize) -> bool {
    n == least_factor(n)
}

pub struct PrimitivePrimeWithBar {
    upper: usize,
}
pub struct PrimitivePrimeWithoutBar {
    upper: usize,
}

impl PrimitivePrimeTestTrait for PrimitivePrimeWithBar {
    fn sync(&self) -> usize {
        let mut bar = ProgressBar::new(self.upper as u64 - 2);
        bar.set_max_refresh_rate(Some(Duration::from_millis(0)));

        (2..self.upper)
            .inspect(|_| {
                bar.inc();
            })
            .filter(|&i| _is_prime_least_factor(i))
            // .filter(|&i| _is_prime_primitive(i))
            // .filter(|&i| _is_prime_jumping(i))
            .count()
    }

    fn async(&self) -> usize {
        let bar_mutex = Arc::new(Mutex::new(ProgressBar::new(self.upper as u64 - 2)));
        (2..self.upper)
            .into_par_iter()
            .inspect(|_| {
                let bar = bar_mutex.clone();
                bar.lock().unwrap().inc();
            })
            .filter(|&i| _is_prime_least_factor(i))
            // .filter(|&i| _is_prime_primitive(i))
            // .filter(|&i| _is_prime_jumping(i))
            .count()
    }
}

impl PrimitivePrimeTestTrait for PrimitivePrimeWithoutBar {
    fn sync(&self) -> usize {
        (2..self.upper)
                .filter(|&i| _is_prime_least_factor(i))
                // .filter(|&i| _is_prime_primitive(i))
                // .filter(|&i| _is_prime_jumping(i))
                .count()
    }

    fn async(&self) -> usize {
        (2..self.upper)
            .into_par_iter()
            .filter(|&i| _is_prime_least_factor(i))
            // .filter(|&i| _is_prime_primitive(i))
            // .filter(|&i| _is_prime_jumping(i))
            .count()
    }
}

pub trait PrimitivePrimeTestTrait {
    fn sync(&self) -> usize;
    fn async(&self) -> usize;
}

pub struct PrimitivePrimeTest;

impl PrimitivePrimeTest {
    pub fn new(upper: usize) -> PrimitivePrimeWithoutBar {
        PrimitivePrimeWithoutBar { upper }
    }

    pub fn with_bar(upper: usize) -> PrimitivePrimeWithBar {

        PrimitivePrimeWithBar { upper }
    }
}


#[cfg(test)]
mod test {

    use super::*;
    use test::Bencher;
    use test::black_box;

    #[bench]
    fn is_prime_least_factor_bench(b: &mut Bencher) {
        let n = black_box(1_000);
        let p = black_box(1_000_000);

        b.iter(|| (0..n).fold(false, |_, _| _is_prime_least_factor(p)));
    }

    #[bench]
    fn is_prime_primitive_bench(b: &mut Bencher) {
        let n = black_box(1_000);
        let p = black_box(1_000_000);

        b.iter(|| (0..n).fold(false, |_, _| _is_prime_primitive(p)));
    }

    #[bench]
    fn is_prime_jumping_bench(b: &mut Bencher) {
        let n = black_box(1_000);
        let p = black_box(1_000_000);

        b.iter(|| (0..n).fold(false, |_, _| _is_prime_jumping(p)));
    }

}
