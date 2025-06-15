// JavaScript source code
let grid = [];
let score = 0;
let gameOver = false;

function emp() {
    grid = [];
    for (let i = 0; i < 4; i++) {
        grid[i] = [];
        for (let j = 0; j < 4; j++) {
            grid[i][j] = 0;
        }
    }
}

function add() {
    let em = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                em.push({ x: i, y: j });
            }
        }
    }
    if (em.length > 0) {
        let r = Math.floor(Math.random() * em.length);
        let x = em[r].x;
        let y = em[r].y;
        grid[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
}
function draw() {
    const board = document.getElementById("board");
    board.innerHTML = "";
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (grid[i][j] !== 0) {
                cell.textContent = grid[i][j];
                cell.classList.add(`cell-${grid[i][j]}`);
            }
            board.appendChild(cell);
        }
    }
    document.getElementById("score").textContent = `Score: ${score}`;

}
function slide(row) {
    let rowf = row.filter(val => val);
    for (let i = 0; i < rowf.length - 1; i++) {
        if (rowf[i] === rowf[i + 1]) {
            rowf[i] *= 2;
            score += rowf[i];
            rowf.splice(i + 1, 1);
        }
    }
    while (rowf.length < 4) {
        rowf.push(0);
    }
    return rowf;
}
function rotate(clockwise = true) {
    const newGrid = [];
    for (let i = 0; i < 4; i++) {
        newGrid[i] = [];
        for (let j = 0; j < 4; j++) {
            if (clockwise) {
                newGrid[i][j] = grid[3 - j][i];
            } else {
                newGrid[i][j] = grid[j][3 - i];
            }
        }
    }
    return newGrid;
}
function move(dir) {
    if (gameOver) return;
    let moved = false;
    if (dir === "left") {
        for (let i = 0; i < 4; i++) {
            const originalRow = grid[i].slice();
            grid[i] = slide(grid[i]);
            if (grid[i].toString() !== originalRow.toString()) {
                moved = true;
            }
        }
    } else if (dir === "right") {
        for (let i = 0; i < 4; i++) {
            const originalRow = grid[i].slice();
            grid[i] = slide(grid[i].reverse()).reverse();
            if (grid[i].toString() !== originalRow.toString()) {
                moved = true;
            }
        }
    } else if (dir === "up") {
        grid = rotate(false);
        for (let i = 0; i < 4; i++) {
            const originalRow = grid[i].slice();
            grid[i] = slide(grid[i]);
            if (grid[i].toString() !== originalRow.toString()) {
                moved = true;
            }
        }
        grid = rotate(true);
    } else if (dir === "down") {
        grid = rotate(false);
        for (let i = 0; i < 4; i++) {
            const originalRow = grid[i].slice();
            grid[i] = slide(grid[i].reverse()).reverse();
            if (grid[i].toString() !== originalRow.toString()) {
                moved = true;
            }
        }
        grid = rotate(true);
    }
    if (moved) {
        add();
        draw();
    }
    if (!gameOver && go()) {
        alert("Game Over! Your score: " + score);
        gameOver = true;
    }
}
function go() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] == 0) return false;
            if (i < 3 && grid[i][j] == grid[i + 1][j]) return false;
            if (j < 3 && grid[i][j] == grid[i][j + 1]) return false;
        }
    }
    return true;
}
document.addEventListener("keydown", function (H) {
    if (H.key === "ArrowLeft") {
        move("left");
    }
    else if (H.key === "ArrowRight") {
        move("right");
    } else if (H.key === "ArrowUp") {
        move("up");
    } else if (H.key === "ArrowDown") {
        move("down");
    }
});
window.onload = () => {
    emp();
    add();
    add();
    draw();
}
