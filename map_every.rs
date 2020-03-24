struct MapEvery<I, F> {
    iter: I,
    projection: F,
    n: usize,
    i: usize,
}

impl<I: Iterator, F> MapEvery<I, F> {
    fn new(iter: I, projection: F, n: usize) -> MapEvery<I, F> {
        MapEvery {
            iter,
            projection,
            n,
            i: 0,
        }
    }
}

trait MapEveryEnumerable<I> {
    fn map_every<F>(self, n: usize, projection: F) -> MapEvery<I, F>;
    fn map_every_other<F>(self, projection: F) -> MapEvery<I, F>;
}

impl<I: Iterator, F> Iterator for MapEvery<I, F>
where
    F: FnMut(I::Item) -> I::Item,
{
    type Item = I::Item;

    #[inline]
    fn next(&mut self) -> Option<I::Item> {
        self.iter.next().map(|x| {
            let ret = if self.i % self.n == 0 {
                (self.projection)(x)
            } else {
                x
            };
            self.i += 1;
            ret
        })
    }
}

impl<I> MapEveryEnumerable<I> for I
where
    I: Iterator,
{
    fn map_every<F>(self, n: usize, projection: F) -> MapEvery<I, F> {
        MapEvery::new(self, projection, n)
    }

    fn map_every_other<F>(self, projection: F) -> MapEvery<I, F> {
        MapEvery::new(self, projection, 2)
    }
}

fn main() {
    for x in (1..9).map_every(3, |i| i + 1000) {
        println!("{}", x);
    }

    for x in (1..9).map_every_other(|i| i + 1000) {
        println!("{}", x);
    }
}
