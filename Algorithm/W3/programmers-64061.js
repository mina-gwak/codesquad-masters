// 크레인 인형뽑기 게임
// https://programmers.co.kr/learn/courses/30/lessons/64061

function solution(board, moves) {
  const basket = [];
  let answer = 0;

  for (let i = 0; i < moves.length; i++) {
    for (let j = 0; j < board.length; j++) {

      if (board[j][moves[i] - 1]) {

        if (!basket.length) basket.push(board[j][moves[i] - 1]);

        else if (board[j][moves[i] - 1] && basket[basket.length - 1] === board[j][moves[i] - 1]) {
          basket.pop();
          answer += 2;
        }

        else {
          basket.push(board[j][moves[i] - 1]);
        }

        board[j][moves[i] - 1] = 0;
        break;
      }
    }
  }
  return answer;
}