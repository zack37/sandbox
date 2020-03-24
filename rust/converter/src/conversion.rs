pub trait Conversion {
    type Unit;

    fn convert_to(&self, to: Self::Unit) -> Self;
}
