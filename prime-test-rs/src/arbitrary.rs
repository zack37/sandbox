use num::ToPrimitive;
use num::FromPrimitive;
use num::Integer;
use num::One;
use num::Zero;
use num::bigint::BigUint;
use pbr::ProgressBar;
use std::sync::{Arc, Mutex};
use std::sync::mpsc::channel;
use std::thread::spawn;
use std::cmp::Ordering::{Less, Equal};

fn _is_prime(p: &BigUint) -> bool {
    let two = BigUint::from_usize(2).unwrap();
    let three = BigUint::from_usize(3).unwrap();

    match p.cmp(&BigUint::one()) {
        Less | Equal => {
            return false;
        }
        _ => { /* ignore */ }
    }
    if p.cmp(&two) == Equal || p.cmp(&three) == Equal {
        return true;
    }
    if p.is_even() || p.is_multiple_of(&three) {
        return false;
    }

    let mut i = BigUint::from_usize(5).unwrap();
    let mut w = BigUint::from_usize(2).unwrap();
    let six = BigUint::from_usize(6).unwrap();
    let square = |x: &BigUint| x * x;
    let should_keep_going = |i: &BigUint, p: &BigUint| match square(i).cmp(p) {
        Less | Equal => true,
        _ => false,
    };

    while should_keep_going(&i, p) {
        if p.is_multiple_of(&i) {
            return false;
        }

        i = i + &w;
        w = &six - w;
    }

    true
}

pub struct ArbitraryPrimeTest {
    upper: BigUint,
}

impl ArbitraryPrimeTest {
    pub fn new(upper: BigUint) -> ArbitraryPrimeTest {
        ArbitraryPrimeTest { upper }
    }

    pub fn sync(&self) -> BigUint {
        let mut prime_count = BigUint::zero();
        let mut counter = BigUint::from_usize(2).unwrap();
        let one = BigUint::one();

        while counter < self.upper {
            if _is_prime(&counter) {
                prime_count = prime_count + &one;
            }
            counter = counter + &one;
        }

        prime_count
        // println!("Ratio of primes = {}/{}", prime_count, self.upper);
    }

    pub fn sync_with_bar(&self) {
        let mut prime_count = BigUint::zero();
        let mut counter = BigUint::from_usize(2).unwrap();
        let mut bar = ProgressBar::new(self.upper.to_u64().expect(
            "Number too large for progress bar",
        ));
        let one = BigUint::one();

        while counter < self.upper {
            bar.inc();
            if _is_prime(&counter) {
                prime_count = prime_count + &one;
            }
            counter = counter + &one;
        }

        println!("Ratio of primes = {}/{}", prime_count, self.upper);
    }

    pub fn async(&self) -> BigUint {
        let (tx, rx) = channel();

        let mut lower_arc = Arc::new(BigUint::from_usize(2).unwrap());
        let mut prime_count = BigUint::zero();

        {
            let tx_mutex = Arc::new(Mutex::new(tx));
            while *lower_arc < self.upper {
                let lower = lower_arc.clone();
                let tx = tx_mutex.clone();
                spawn(move || if _is_prime(&lower) {
                    tx.lock()
                        .expect("Acquiring lock on tx failed")
                        .send(())
                        .expect("Failed to send prime");
                });

                lower_arc = Arc::new((*lower_arc).clone() + 1_usize);
            }
        }

        for _ in rx {
            prime_count = prime_count + 1_u64;
        }

        // println!("Ratio of primes = {}/{}", prime_count, self.upper);
        prime_count
    }

    pub fn async_with_bar(&self) {
        let bar_mutex = Arc::new(Mutex::new(
            ProgressBar::new(self.upper.to_u64().unwrap() - 2),
        ));
        let (tx, rx) = channel();

        bar_mutex.lock().unwrap().format("[=> ]");
        bar_mutex.lock().unwrap().set_max_refresh_rate(None);

        let mut lower_arc = Arc::new(BigUint::from_usize(2).unwrap());
        let mut prime_count = BigUint::zero();

        {
            let tx_mutex = Arc::new(Mutex::new(tx));
            while *lower_arc < self.upper {
                let bar = bar_mutex.clone();
                let lower = lower_arc.clone();
                let tx = tx_mutex.clone();
                spawn(move || {
                    bar.lock().expect("Acquiring lock on bar failed").inc();
                    if _is_prime(&lower) {
                        tx.lock()
                            .expect("Acquiring lock on tx failed")
                            .send(())
                            .expect("Failed to send prime");
                    }
                });

                lower_arc = Arc::new((*lower_arc).clone() + 1_usize);
            }
        }

        for _ in rx {
            prime_count = prime_count + 1_u64;
        }

        bar_mutex
            .lock()
            .expect("Acquiring lock on bar failed")
            .finish();
        println!("Ratio of primes = {}/{}", prime_count, self.upper);
    }
}
