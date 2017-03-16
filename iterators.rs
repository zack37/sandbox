fn gen3() -> Iterator<Item=usize> {
    (1..4)
}

fn main() {
    let iter = gen3();
    println!("{:?}", iter.next());
    println!("{:?}", iter.next());
    println!("{:?}", iter.next());
    println!("{:?}", iter.next());
}
