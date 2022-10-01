$(document).ready(function () {
	const size = 8;

	const getKnightMoves = (x, y) => {
		if (x == -1 || y == -1) return [];
		const moves = [];
		console.log(x, y);
		if (x > 1) {
			if (y > 0) {
				moves.push({
					x: x - 2,
					y: y - 1,
				});
			}
			if (y < size - 1) {
				moves.push({
					x: x - 2,
					y: y + 1,
				});
			}
		}
		if (x < size - 2) {
			if (y > 0) {
				moves.push({
					x: x + 2,
					y: y - 1,
				});
			}
			if (y < size - 1) {
				moves.push({
					x: x + 2,
					y: y + 1,
				});
			}
		}
		if (y > 1) {
			if (x > 0) {
				moves.push({
					x: x - 1,
					y: y - 2,
				});
			}
			if (x < size - 1) {
				moves.push({
					x: x + 1,
					y: y - 2,
				});
			}
		}
		if (y < size - 2) {
			if (x > 0) {
				moves.push({
					x: x - 1,
					y: y + 2,
				});
			}
			if (x < size - 1) {
				moves.push({
					x: x + 1,
					y: y + 2,
				});
			}
		}
		return moves;
	};

	const knightMovable = (moves, x, y) => {
		const idx = moves.findIndex((move) => move.x == x && move.y == y);
		return idx > -1;
	};

	const drawChess = (posX = -1, posY = -1) => {
		$('#chess-ground').empty();
		const chess = [];

		const moves = getKnightMoves(+posX, +posY);

		for (let i = 0; i < size; i++) {
			let div = '<div>';
			for (let j = 0; j < size; j++) {
				div += `<div class="${
					'chess-block ' + (knightMovable(moves, i, j) ? 'movable' : '')
				}" data-i="${i}" data-j="${j}">
                ${
									posX == i && posY == j
										? '<img src="/knight.png" alt="Knight"/>'
										: ''
								}
                </div>`;
			}
			div += '</div>';
			chess.push(div);
		}

		$('#chess-ground').append(chess);
		addListeners();
	};

	const addListeners = () => {
		$('.chess-block').click((e) => {
			posX = e.target.getAttribute('data-i');
			posY = e.target.getAttribute('data-j');
			drawChess(posX, posY);
		});
	};

	drawChess();
});
