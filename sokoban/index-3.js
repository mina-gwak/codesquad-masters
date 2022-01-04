import { textToStageArray, getStageInfos } from './index.js';

const convertData = {
  0: '#',
  1: 'O',
  2: 'o',
  3: 'P',
  5: ' ',
  6: '0',
};

const moveData = {
  'W': [-1, 0],
  'A': [0, -1],
  'S': [1, 0],
  'D': [0, 1],
};

function Step3() {

  this.fileLoaded = false;
  this.stageInfos = [];
  this.currentStage = 0;
  this.currentPlayerPosition = [];
  this.explanation = '';
  this.mapArray = [];
  this.ballCount = 0;
  this.moveCount = 0;
  this.slots = {};

  let interval;
  let index;
  const $ = (selector) => document.querySelector(selector);

  // 사용자가 입력한 값을 가져와서 배열로 반환
  const getInput = (e) => {
    return e.target.value.split('');
  };

  // 유효한 입력값인지 확인
  const isValid = (input) => {
    return input === 'W' || input === 'A' || input === 'S' || input === 'D';
  };

  // 주어진 값만큼 이동한 좌표의 값 반환
  const getNextPosition = (rowChange, colChange) => {
    return this.mapArray[this.currentPlayerPosition[0] - 1 + rowChange][this.currentPlayerPosition[1] - 1 + colChange]
  }

  // 플레이어가 이동할 좌표가 이동할 수 있는 좌표인지 확인
  const checkNextPosition = (rowChange, colChange) => {
    const nextPosition = getNextPosition(rowChange, colChange);
    if (nextPosition === 1 || nextPosition === 5) return true;
    else if (nextPosition === 2 || nextPosition === 6) {
      const nextPositionFromCurrent = getNextPosition(rowChange * 2, colChange * 2);
      return nextPositionFromCurrent === 1 || nextPositionFromCurrent === 5;
    } else return false;
  };

  // 플레이어가 위치하던 좌표의 값 변경
  const setCurrentPosition = () => {
    const originalMapPosition = this.stageInfos[this.currentStage].mapArray[this.currentPlayerPosition[0] - 1][this.currentPlayerPosition[1] - 1];
    if (originalMapPosition === 1) this.mapArray[this.currentPlayerPosition[0] - 1][this.currentPlayerPosition[1] - 1] = 1;
    else this.mapArray[this.currentPlayerPosition[0] - 1][this.currentPlayerPosition[1] - 1] = 5;
  }

  // 플레이어가 이동한 좌표의 값 변경
  const setMovedPosition = (rowChange, colChange) => {
    const movedPosition = this.mapArray[this.currentPlayerPosition[0] - 1][this.currentPlayerPosition[1] - 1];

    // 이동한 좌표가 o일 경우
    if (movedPosition === 2) {
      const nextPosition = this.mapArray[this.currentPlayerPosition[0] - 1 + rowChange][this.currentPlayerPosition[1] - 1 + colChange];
      if (nextPosition === 1) {   // 그다음 칸이 O인지 체크
        this.mapArray[this.currentPlayerPosition[0] - 1 + rowChange][this.currentPlayerPosition[1] - 1 + colChange] = 6;
        this.ballCount--;
      } else this.mapArray[this.currentPlayerPosition[0] - 1 + rowChange][this.currentPlayerPosition[1] - 1 + colChange] = 2;
    }

    // 이동한 좌표가 0일 경우
    else if (movedPosition === 6) {
      this.mapArray[this.currentPlayerPosition[0] - 1 + rowChange][this.currentPlayerPosition[1] - 1 + colChange] = 2;
      this.ballCount++;
    }

    this.mapArray[this.currentPlayerPosition[0] - 1][this.currentPlayerPosition[1] - 1] = 3;
  }

  // 현재 플레이어의 좌표를 변경하여 저장
  const changePosition = (rowChange, colChange) => {
    this.currentPlayerPosition = [this.currentPlayerPosition[0] + rowChange, this.currentPlayerPosition[1] + colChange];
  };

  // 플레이어 이동
  const movePlayer = (input) => {
    setCurrentPosition();
    changePosition(moveData[input][0], moveData[input][1]);
    setMovedPosition(moveData[input][0], moveData[input][1]);
    this.moveCount++;
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

  // 게임 종료
  const finishGame = () => {
    this.explanation = `모든 스테이지를 클리어하셨습니다!`;
    print();
    setTimeout(() => initStageInfo(), 3000);
  }

  // 스테이지 종료
  const finishStage = () => {
    this.explanation = `Stage ${this.currentStage + 1} 클리어!`;
    print();
    this.currentStage++;
    if (this.currentStage === this.stageInfos.length) finishGame();
    else setTimeout(() => initStageInfo(this.currentStage), 1000);
  }

  // 메시지 변경
  const changeExplanation = (text) => {
    this.explanation = text;
    print();
  }
  
  // 데이터 슬롯에 저장
  const saveData = (userInput) => {
    if (userInput[1] >= 1 && userInput[1] <= 5) {
      this.slots[userInput[1]] = {
        currentStage: this.currentStage,
        currentPlayerPosition: this.currentPlayerPosition,
        mapArray: this.mapArray.map(arr => arr.slice()),
        ballCount: this.ballCount,
        moveCount: this.moveCount,
      };
      clearInterval(interval);
      changeExplanation(`${userInput[1]}번 세이브에 진행상황을 저장합니다`);
    } else {
      changeExplanation('(경고!) 해당 명령을 수행할 수 없습니다');
    }
  };
  
  // 슬롯에서 데이터 불러오기
  const loadSavedData = (userInput) => {
    if (userInput[1] >= 1 && userInput[1] <= 5 && this.slots[userInput[1]]) {
      this.currentStage = this.slots[userInput[1]].currentStage;
      this.currentPlayerPosition = this.slots[userInput[1]].currentPlayerPosition;
      this.mapArray = this.slots[userInput[1]].mapArray.map(arr => arr.slice());
      this.ballCount = this.slots[userInput[1]].ballCount;
      this.moveCount = this.slots[userInput[1]].moveCount;
      clearInterval(interval);
      changeExplanation(`${userInput[1]}번 세이브에서 진행상황을 불러옵니다`);
    } else {
      changeExplanation('(경고!) 해당 명령을 수행할 수 없습니다');
    }
  }

  // 게임 수행
  const play = (userInput) => {
    const input = userInput[index].toUpperCase();
  
    if (input === 'R') {
      changeExplanation('스테이지를 초기화합니다');
      setTimeout(() => initStageInfo(this.currentStage), 1000);
    } else if (input === 'Q') {
      changeExplanation('프로그램을 종료합니다');
      setTimeout(() => initStageInfo(), 1000);
    } else if (input === 'S' && Number(userInput[1])) {
      saveData(userInput);
    } else if (input === 'L' && Number(userInput[1])) {
      loadSavedData(userInput);
    } else if (!isValid(input) || !checkNextPosition(moveData[input][0], moveData[input][1])) {
      changeExplanation('(경고!) 해당 명령을 수행할 수 없습니다');
    } else {
      movePlayer(input);
      changeExplanation(getExplanation(input));
    }

    if (this.ballCount === 0) finishStage();
    if (++index === userInput.length) clearInterval(interval);
  }

  // 입력값에 따라 게임을 수행하는 함수를 반복 호출
  const startGame = (userInput) => {
    index = 0;
    interval = setInterval(() => play(userInput), 1000);
  };

  // 화면에 스테이지, 지도, 메시지 출력
  const print = () => {
    const map = arrToText(convertToMap(this.mapArray));
    $('.step-3 h4').innerText = this.currentStage === 5 ? '게임 종료' : `Stage ${this.currentStage + 1}`;
    $('.step-3 pre').innerText = map;
    $('.step-3 .map p').innerText = this.explanation;
    $('.step-3 .map span').innerText = `turn: ${this.moveCount}`;
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

  // 스테이지 정보 저장
  const saveStageInfos = (text) => {
    const stageArr = textToStageArray(text);
    this.stageInfos = getStageInfos(stageArr);
    this.fileLoaded = true;
  }

  // 각 스테이지 정보 초기화
  const initStageInfo = (index = 0) => {
    this.currentStage = index;
    this.currentPlayerPosition = this.stageInfos[index].playerPosition;
    this.mapArray = this.stageInfos[index].mapArray.map(arr => arr.slice());
    this.explanation = '';
    this.ballCount = this.stageInfos[index].ballCount;
    this.moveCount = 0;
    clearInterval(interval);
    print();
  }

  // 텍스트 파일 읽어오기
  const loadTextFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      saveStageInfos(this.result);
      initStageInfo();
    }
    reader.readAsText(file);
  }

  // 값이 입력되면 게임이 실행되도록 함
  document.addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') return;
    if (e.target.id === 'step-3-input' && !this.fileLoaded) {
      alert('지도 파일이 선택되지 않았습니다');
      e.target.value = '';
    }
    if (e.target.id === 'step-3-input' && getInput(e).length !== 0) {
      startGame(getInput(e));
      e.target.value = '';
    }
  });

  $('#map-file').addEventListener('change', loadTextFile);
}

new Step3();