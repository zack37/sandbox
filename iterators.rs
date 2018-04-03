fn main() {
    let mut interest = 1.0;
    for _ in 0..5 {
        interest *= 1.01;
    }

    println!("interest: {}", interest);
    println!("interest: {}", 1.0*1.01f64.powf(5.0));
}
