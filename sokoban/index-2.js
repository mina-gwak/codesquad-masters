import { textToStageArray, getStageInfos } from './index.js';

const stage =
`Stage 2
  #######
###  O  ###
#    o    #
# Oo P oO #
###  o  ###
 #   O  #
 ########`;

const convertData = {
  0: '#',
  1: 'O',
  2: 'o',
  3: 'P',
  5: ' ',
};

const moveData = {
  'W': [-1, 0],
  'A': [0, -1],
  'S': [1, 0],
  'D': [0, 1],
};

function Step2() {
  
  this.explanation = '';
  this.currentPlayerPosition = [];
  this.mapArray = [];
  
  const $ = (selector) => document.querySelector(selector);
  
  // 화면에 지도, 메시지 출력
  const print = () => {
    const map = arrToText(convertToMap(this.mapArray));
    $('.step-2 pre').innerText = map;
    $('.step-2 .map p').innerText = this.explanation;
  };
  
  // 숫자 배열을 map 배열로 변환
  const convertToMap = (arr) => {
    return arr.map((row) => {
      return row.map((elem) => {
        return convertData[elem];
      });
    });
  };
  
  // map 배열을 출력하기 위한 텍스트로 변환
  const arrToText = (arr) => {
    let stringMap = '';
    arr.forEach(row => {
      stringMap += `${row.join('')}\n`;
    });
    return stringMap;
  };
  
  // 사용자가 입력한 값을 가져와서 배열로 반환
  const getInput = (e) => {
    return e.target.value.split('');
  };
  
  // 유효한 입력값인지 확인
  const isValid = (input) => {
    return input === 'W' || input === 'A' || input === 'S' || input === 'D' || input === 'Q';
  };
  
  // 플레이어가 이동할 좌표가 이동할 수 있는 좌표인지 확인
  const checkNextPosition = (rowChange, colChange) => {
    return this.mapArray[this.currentPlayerPosition[0] - 1 + rowChange][this.currentPlayerPosition[1] - 1 + colChange] === 5;
  };
  
  // 현재 플레이어의 좌표를 변경
  const changePosition = (rowChange, colChange) => {
    this.currentPlayerPosition = [this.currentPlayerPosition[0] + rowChange, this.currentPlayerPosition[1] + colChange];
  };
  
  // 지도에서 플레이어의 위치를 변경
  const movePlayer = (input) => {
    this.mapArray[this.currentPlayerPosition[0] - 1][this.currentPlayerPosition[1] - 1] = 5;
    changePosition(moveData[input][0], moveData[input][1]);
    this.mapArray[this.currentPlayerPosition[0] - 1][this.currentPlayerPosition[1] - 1] = 3;
  };
  
  // 입력값에 따라 메시지 반환
  const getExplanation = (input) => {
    switch (input) {
      case 'W':
        return '위쪽으로 이동합니다';
      case 'A':
        return '왼쪽으로 이동합니다';
      case 'S':
        return '아래쪽으로 이동합니다';
      case 'D':
        return '오른쪽으로 이동합니다';
    }
  };
  
  // 입력값에 따라 게임을 수행
  const startGame = (userInput) => {
    
    let index = 0;
    
    const play = setInterval(() => {
      const input = userInput[index].toUpperCase();
      
      if (!isValid(input)) {
        this.explanation = '(경고!) 해당 명령을 수행할 수 없습니다';
        print();
      }
      
      else if (input === 'Q') {
        this.explanation = '프로그램을 종료합니다';
        print();
        setTimeout(() => this.init(), 1000);
      }
      
      else if (!checkNextPosition(moveData[input][0], moveData[input][1])) {
        this.explanation = '(경고!) 해당 명령을 수행할 수 없습니다';
        print();
      }
      
      else {
        movePlayer(input);
        this.explanation = getExplanation(input);
        print();
      }
      
      index++;
      if (index === userInput.length) clearInterval(play);
      
    }, 1000);
  };
  
  // 값이 입력되면 게임이 실행되도록 함
  document.addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') return;
    if (e.target.id === 'step-2-input' && getInput(e)) {
      startGame(getInput(e));
      e.target.value = '';
    }
  });
  
  this.init = () => {
    const stageArr = textToStageArray(stage);
    const stageInfo = getStageInfos(stageArr);
    this.currentPlayerPosition = stageInfo[0].playerPosition;
    this.mapArray = stageInfo[0].mapArray;
    this.explanation = '';
    print();
  };
}

const step2 = new Step2();

step2.init();