$(() => {
  let create2DArray = (rows, columns) => {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
      arr[i] = new Array(columns);
      for (var j = 0; j < columns; j++) {
        arr[i][j] = null;
      }
    }
    return arr;
  };

  const Badge = {
    CROSS: 0,
    CIRCLE: 1,
  };

  const Type = {
    COMPUTER: 0,
    HUMAN: 1,
  };

  let $table = $(".tictactoe");
  let player1 = { BADGE: Badge.CROSS, TYPE: Type.HUMAN };
  let player2 = { BADGE: Badge.CIRCLE, TYPE: Type.COMPUTER};
  let currentPlayer = player1;
  let board = create2DArray(3, 3);

  $table.css({
    "font-size": "26px",
    border: "2px solid black",
  });

  let $cells = $table.find("td");

  $cells.each((index, elem) => {
    $(elem)
      .css({
        width: "200px",
        height: "200px",
        border: "1px solid black",
      })
      .attr({
        title: index,
      })
      .addClass("selected")
      .on("click", (e) => {
        playGame(index, elem);
      });
  });

  let decideNextMove = () => {
    if (currentPlayer.TYPE === Type.COMPUTER) {
      computerMove();
    }
  };

  let playGame = (index, elem) => {
    if (board[Math.floor(index / 3)][index % 3] !== null) return;

    let image;

    switch (currentPlayer.BADGE) {
      case Badge.CROSS: {
        image = `url(https://celes.club/uploads/posts/2022-11/1667389195_1-celes-club-p-krasnii-krestik-bez-fona-pinterest-1.png)`;
        break;
      }
      case Badge.CIRCLE: {
        image = `url(https://clipart-library.com/images_k/red-circle-transparent-png/red-circle-transparent-png-11.png)`;
        break;
      }
    }

    $(elem).css({
      "background-image": image,
      "background-repeat": "no-repeat",
      "background-size": "contain",
    });
    board[Math.floor(index / 3)][index % 3] = currentPlayer.BADGE;
    handleMove(currentPlayer.BADGE);
    currentPlayer = currentPlayer === player1 ? player2 : player1;

    decideNextMove();
  };

  let handleMove = (badge) => {
    if (checkWin(badge)) {
      alert(
        badge === Badge.CROSS ? "Крестики перемогли!" : "Нолики перемогли!"
      );
      resetGame();
    } else if (checkTie()) {
      alert("Гра закінчилась у нічию!");
      resetGame();
    }
  };

  let computerMove = () => {
    let freePositions = [];

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) freePositions.push({ row, col });
      }
    }

    if (freePositions.length > 0) {
      let randomPos =
        freePositions[Math.floor(Math.random() * freePositions.length)];
      let $cell = $($cells[randomPos.row * 3 + randomPos.col]);
      $cell.trigger("click");
    }
  };

  let checkWin = (badgeCheck) => {
    for (let row = 0; row < 3; row++) {
      if (
        board[row][0] === badgeCheck &&
        board[row][1] === badgeCheck &&
        board[row][2] === badgeCheck
      )
        return true;
    }

    for (let col = 0; col < 3; col++) {
      if (
        board[0][col] === badgeCheck &&
        board[1][col] === badgeCheck &&
        board[2][col] === badgeCheck
      )
        return true;
    }

    if (
      board[0][0] === badgeCheck &&
      board[1][1] === badgeCheck &&
      board[2][2] === badgeCheck
    )
      return true;

    if (
      board[0][2] === badgeCheck &&
      board[1][1] === badgeCheck &&
      board[2][0] === badgeCheck
    )
      return true;

    return false;
  };

  let checkTie = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) return false;
      }
    }
    return true;
  };

  let resetGame = () => {
    $cells.css({
      "background-image": "",
      "background-repeat": "",
      "background-size": "",
    });
    board = create2DArray(3, 3);
    currentPlayer = { BADGE: Badge.CROSS, TYPE: Type.HUMAN };
  };
});
