extern crate sudoku;

use sudoku::Sudoku;

fn main() {
    let puzzles: Vec<[u8;81]> = vec![
    [
        0,6,3,  0,0,0,  0,0,8,
        9,0,8,  5,0,0,  0,0,0,
        0,0,0,  0,7,0,  0,0,0,

        0,0,0,  0,0,4,  5,0,0,
        8,3,0,  0,5,0,  0,9,0,
        0,0,9,  6,1,0,  0,0,0,

        0,5,0,  0,3,0,  4,6,0,
        0,0,0,  0,0,0,  0,0,0,
        2,0,0,  1,0,0,  0,3,0,
    ],
    [
        0,6,3,  0,0,0,  0,0,8,
        9,0,8,  5,0,0,  0,0,0,
        0,0,0,  0,7,0,  0,0,0,

        0,0,0,  0,0,4,  5,0,0,
        8,3,0,  0,5,0,  0,9,0,
        0,0,9,  6,1,0,  0,0,0,

        0,5,0,  0,3,0,  4,6,0,
        0,0,0,  0,0,0,  0,0,0,
        2,0,0,  1,0,0,  0,3,0,
    ],
    ];

    for (i, puzzle) in puzzles.iter().enumerate() {
        println!("puzzle #{}", i+1);
        let sudoku = Sudoku::from_bytes(*puzzle).unwrap();

        if let Some(solution) = sudoku.solve_unique() {
            println!("{}", solution);
        }

        println!("");
    }
}
