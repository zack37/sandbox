use conversion::Conversion;
use std::fmt;
use std::str::FromStr;
use TemperatureUnit::*;

lazy_static! {
    static ref TEMPERATURE_RE: Regex = regex!(r"(?xi)(?P<value>\d*(\.\d+)?)\s?(?P<unit>(F|C|K|R))");
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum TemperatureUnit {
    Fahrenheit,
    Celsius,
    Kelvin,
    Rankine,
}

impl FromStr for TemperatureUnit {
    type Err = String;
    fn from_str(value: &str) -> Result<Self, Self::Err> {
        match value.to_uppercase().trim() {
            "F" => Ok(Fahrenheit),
            "C" => Ok(Celsius),
            "K" => Ok(Kelvin),
            "R" => Ok(Rankine),
            _ => Err(format!("Invalid input: {}", value)),
        }
    }
}

impl fmt::Display for TemperatureUnit {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let unit = match self {
            Fahrenheit => "F",
            Celsius => "C",
            Kelvin => "K",
            Rankine => "R",
        };
        write!(f, "{}", unit)
    }
}

#[derive(Debug, PartialEq)]
pub struct Temperature {
    value: f64,
    unit: TemperatureUnit,
}

impl Temperature {
    pub fn new(value: f64, unit: TemperatureUnit) -> Temperature {
        Temperature { value, unit }
    }
}

impl Conversion for Temperature {
    type Unit = TemperatureUnit;
    fn convert_to(&self, to: Self::Unit) -> Self {
        let new_value = match (self.unit, to) {
            (Fahrenheit, Fahrenheit) => self.value,
            (Fahrenheit, Celsius) => (self.value - 32.0) / 1.8,
            (Fahrenheit, Kelvin) => (self.value - 32.0) / 1.8 + 237.15,
            (Fahrenheit, Rankine) => self.value - 32.0 + 491.67,

            (Celsius, Fahrenheit) => self.value * 1.8 + 32.0,
            (Celsius, Celsius) => self.value,
            (Celsius, Kelvin) => self.value - 273.15,
            (Celsius, Rankine) => self.value * 1.8 + 491.67,

            (Kelvin, Fahrenheit) => 1.8 * (self.value - 273.15) + 32.0,
            (Kelvin, Celsius) => self.value - 273.15,
            (Kelvin, Kelvin) => self.value,
            (Kelvin, Rankine) => (self.value - 273.15) * 1.8 + 491.67,

            (Rankine, Fahrenheit) => self.value - 491.67 + 32.0,
            (Rankine, Celsius) => (self.value - 491.67) / 1.8,
            (Rankine, Kelvin) => (self.value - 491.67) / 1.8 + 273.15,
            (Rankine, Rankine) => self.value,
        };

        Temperature::new(new_value, to)
    }
}

impl fmt::Display for Temperature {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let degree = match self.unit {
            Kelvin => "",
            _ => "°",
        };
        write!(f, "{:.2}{}{}", self.value, degree, self.unit)
    }
}

pub fn convert(input: String, to: TemperatureUnit) -> Temperature {
    let captures = TEMPERATURE_RE.captures(input).expect(&format!("Invalid input: {}", input));
    let (value, unit) = (capture!(captures, "value", f64), capture!(captures, "unit", TemperatureUnit));
    
    let temp = Temperature::new(value, unit);
    
    temp.convert_to(to)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn f_to_c() {
        let test_data: [(f64, f64); 10] = [
            (32.0, 0.0),
            (212.0, 100.0),
            (5.0, -15.0),
            (14.0, -10.0),
            (41.0, 5.0),
            (50.0, 10.0),
            (95.0, 35.0),
            (365.0, 185.0),
            (374.0, 190.0),
            (328.0, 164.44444444444443),
        ];

        for &(input, expected_value) in test_data.iter() {
            let expected = Temperature::new(expected_value, Celsius);
            let original = Temperature::new(input, Fahrenheit);
            let actual = original.convert_to(Celsius);

            assert_eq!(actual, expected);
        }
    }

    #[test]
    fn f_to_k() {
        unimplemented!();
    }

    #[test]
    fn f_to_r() {
        unimplemented!();
    }

    #[test]
    fn c_to_f() {
        unimplemented!();
    }
    #[test]
    fn c_to_k() {
        unimplemented!();
    }
    #[test]
    fn c_to_r() {
        unimplemented!();
    }

    #[test]
    fn k_to_f() {
        unimplemented!();
    }
    #[test]
    fn k_to_c() {
        unimplemented!();
    }
    #[test]
    fn k_to_r() {
        unimplemented!();
    }

    #[test]
    fn r_to_f() {
        unimplemented!();
    }
    #[test]
    fn r_to_c() {
        unimplemented!();
    }
    #[test]
    fn r_to_k() {
        unimplemented!();
    }
}
