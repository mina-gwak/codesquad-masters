# Sokoban

## 실행

index.html 실행  

- STEP 1 : console에 출력
- STEP 2 : 화면에 출력
- STEP 3 : map.txt 파일 선택하여 실행, 화면에 출력

## 구현과정

### 1단계

1. input이 들어오면 각 스테이지를 구분하여 stages 배열에 저장한다.
    ```javascript
    const textToStageArray = (input) => {
      return input.split('\n=====\n').map(stage => stage.split('\n'));
    };
    
    // ['Stage 1', '#####', '#OoP#', '#####']
    // ['Stage 2', '  #######', '###  O  ###', '#    o    #', '# Oo P oO #', '###  o  ###', ' #   O  # ', ' ########']
    ```

2. 위의 배열을 순회하며 스테이지에 관한 정보를 객체에 저장하여 반환한다.

   1. 스테이지 제목을 제외한 배열 요소들, 즉 지도를 나타내는 요소들 중 가장 긴 길이를 가로 길이로, 지도를 나타내는 요소의 개수를 세로 길이로 지정한다.
   ```javascript
    const getLength = (stage) => {
      const rowLength = Math.max(...stage.map((row, index) => {
        if (index === 0) return 0;
        else return row.length;
      }));
      const colLength = stage.length - 1;
      return [rowLength, colLength];
    }
    ```
   
   2. 가로 길이와 세로 길이를 이용해 2차원 배열을 생성한다. (공백을 의미하는 5로 초기화)
   ```javascript
    const initArray = Array.from({ length: colLength }, () => Array(rowLength).fill(5));
    ```
   
   3. 스테이지와 초기화된 2차원 배열을 인자로 받아 스테이지 정보를 추출한다. 스테이지 배열을 순회하며 제목을 표시하는 경우에는 현재 무슨 스테이지인지를 저장한다. 그리고 지도를 나타내는 경우에는 기호를 지정된 숫자로 변환하여 넣어주며, 공을 의미하는 기호가 나타나면 카운트하고 플레이어를 의미하는 기호가 나타나면 인덱스를 사용해 플레이어의 위치를 저장한다.
   ```javascript
   const getMapInfo = (stage, initArray) => {
     const mapInfo = { 
     stage: 0,
     playerPosition: '',
     ballCount: 0,
     mapArray: initArray,
     }
    
      stage.forEach((row, rowIndex) => {
      // Stage 제목을 표시하는 경우
      if (rowIndex === 0) {
        mapInfo.stage = row.slice(-1);
        return;
      }
    
      return row.split('').forEach((elem, elemIndex) => {
        switch (elem) {
          case '#':
            mapInfo.mapArray[rowIndex - 1][elemIndex] = 0;
            return;
          case 'O':
            mapInfo.ballCount++;
            mapInfo.mapArray[rowIndex - 1][elemIndex] = 1;
            return;
          case 'o':
            mapInfo.mapArray[rowIndex - 1][elemIndex] = 2;
            return;
          case 'P':
            mapInfo.playerPosition = `(${rowIndex}, ${elemIndex + 1})`;
            mapInfo.mapArray[rowIndex - 1][elemIndex] = 3;
            return;
          default:
            return;
        }
      });
      });
      return mapInfo;
    };
   ```
   
3. stages 배열과 스테이지 정보를 받아와서 출력 형태에 맞게 결합한 뒤 출력한다. 
   ```javascript
    const printStageInfo = (stages, stageInfos) => {
      let combinedInfo = '';
    
      // 지도 정보
      stageInfos.forEach((stageInfo, index) => {
        let map = '';
        stages[index].forEach((row, rowIndex) => {
          if (rowIndex) map += `${row}\n`;
      });
        
      // 스테이지별 출력할 정보
      combinedInfo +=
    `Stage ${stageInfo.stage}\n
    ${map}
    가로크기: ${stageInfo.rowLength}
    세로크기: ${stageInfo.colLength}
    구멍의 수: ${stageInfo.ballCount}
    공의 수: ${stageInfo.ballCount}
    플레이어 위치 ${stageInfo.playerPosition}\n
    `;
      });
    
      console.log(combinedInfo);
    }
    ```
   
#### 출력 결과

![1단계 출력결과](https://user-images.githubusercontent.com/62706988/144904681-6b0d38dd-2036-4642-bee4-d495a947eed4.png)

### 2단계

1. 1단계의 스테이지 2 정보와 숫자를 기호로 변환하기 위한 데이터, 입력값에 따라 좌표를 이동하기 위한 데이터를 세팅한다. 그리고 1단계에서 작성한 함수를 사용해 스테이지 2의 정보를 추출하고 현재 플레이어의 포지션, 숫자 배열, 출력할 메시지를 초기화하여 화면에 출력한다. 

  ```javascript
  this.init = () => {
    const stageArr = textToStageArray(stage);
    const stageInfo = getStageInfos(stageArr);
    this.currentPlayerPosition = stageInfo[0].playerPosition;
    this.mapArray = stageInfo[0].mapArray;
    this.explanation = '';
    print();
  };
  ```

2. html에서 지도와 메시지를 출력할 수 있도록 하고 input으로 사용자에게 입력을 받는다. 
   
   #### 입력 화면
   ![입력 화면](https://user-images.githubusercontent.com/62706988/144988541-00466bff-afe0-4a55-8cf2-c959248c013a.png)

3. 입력 이벤트가 감지되면 입력값을 배열로 변환하여 전달하면서 게임을 실행한다. `startGame`에서는 전달된 배열을 일정 시간 간격으로 순회하면서 개별 입력값에 대한 처리를 수행한다.

  ```javascript
  document.addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') return;
    if (e.target.id === 'step-2-input' && getInput(e)) {
      startGame(getInput(e));
      e.target.value = '';
    }
  });
  ```

4. 입력값이 조건에 부합하는지 확인하여 플레이어가 이동할지, 이동한다면 어느 방향으로 이동할지 정해준다.
   
    1. 유효한 입력값인지 체크 (W, A, S, D, Q)
  
    ```javascript
    const isValid = (input) => {
      return input === 'W' || input === 'A' || input === 'S' || input === 'D' || input === 'Q';
    };
    ```

    2. 입력값이 Q인지 체크한 후, 모든 값을 초기화시키며 프로그램을 종료한
  
    ```javascript
    else if (input === 'Q') {
      this.explanation = '프로그램을 종료합니다';
      print();
      setTimeout(() => this.init(), 1000);
    }
    ```

    3. 플레이어가 이동할 좌표가 이동할 수 있는 좌표인지 체크
  
    ```javascript
    const checkNextPosition = (rowChange, colChange) => {
      return this.mapArray[this.currentPlayerPosition[0] - 1 + rowChange][this.currentPlayerPosition[1] - 1 + colChange] === 5;
    };
    ```

    4. 그 외의 경우에는 플레이어가 이동이 가능하므로, 플레이어의 좌표를 이동시키고 입력값에 따라 알맞은 메시지를 지정
  
    ```javascript
    const changePosition = (rowChange, colChange) => {
      this.currentPlayerPosition = [this.currentPlayerPosition[0] + rowChange, this.currentPlayerPosition[1] + colChange];
    };

    const movePlayer = (input) => {
      this.mapArray[this.currentPlayerPosition[0] - 1][this.currentPlayerPosition[1] - 1] = 5;
      changePosition(moveData[input][0], moveData[input][1]);
      this.mapArray[this.currentPlayerPosition[0] - 1][this.currentPlayerPosition[1] - 1] = 3;
    };

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
    ```
5. 변경된 지도와 메시지를 화면에 보여준다.

  ```javascript
  const print = () => {
    const map = arrToText(convertToMap(this.mapArray));
    $('.step-2 pre').innerText = map;
    $('.map p').innerText = this.explanation;
  };
  ```

### 3단계

1. 사용자가 map.txt 파일을 선택하면 해당 파일을 읽어와 정보를 저장하고 게임 실행에 필요한 설정을 세팅한 뒤 스테이지 1부터 화면에 표시한다. 

    ```javascript
    const print = () => {
      const map = arrToText(convertToMap(this.mapArray));
      $('.step-3 h4').innerText = this.currentStage === 5 ? '게임 종료' : `Stage ${this.currentStage + 1}`;
      $('.step-3 pre').innerText = map;
      $('.step-3 .map p').innerText = this.explanation;
      $('.step-3 .map span').innerText = `turn: ${this.moveCount}`;
    };
  
    const saveStageInfos = (text) => {
      const stageArr = textToStageArray(text);
      this.stageInfos = getStageInfos(stageArr);
      this.fileLoaded = true;
    }
  
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
  
    const loadTextFile = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        saveStageInfos(this.result);
        initStageInfo();
      }
      reader.readAsText(file);
    }
  
    $('#map-file').addEventListener('change', loadTextFile);
    ```
    
    #### 입력 화면 
  
    ![3단계 입력 화면](https://user-images.githubusercontent.com/62706988/145127634-10c1cfe6-82d7-4c21-8312-439f5ff9c22e.png)

2. 사용자가 input에 값을 입력하면 지도 파일이 업로드되었는지, 빈 값이 입력되지 않았는지 체크한 후 게임을 실행하도록 한다.

    ```javascript
    const startGame = (userInput) => {
      index = 0;
      interval = setInterval(() => play(userInput), 1000);
    };
  
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
    ```

3. 사용자의 입력값에 따라 게임을 실행한다. (대부분 2단계와 동일, R 입력 시 스테이지를 초기화하는 것과 남은 볼 개수가 0이 되면 스테이지를 클리어하는 부분이 추가되었다.)

    ```javascript
    const changeExplanation = (text) => {
      this.explanation = text;
      print();
    }
  
    const play = (userInput) => {
      const input = userInput[index].toUpperCase();
      
      if (!isValid(input) || !checkNextPosition(moveData[input][0], moveData[input][1])) {
        changeExplanation('(경고!) 해당 명령을 수행할 수 없습니다');
      } else if (input === 'R') {
        changeExplanation('스테이지를 초기화합니다');
        setTimeout(() => initStageInfo(this.currentStage), 1000);
      } else if (input === 'Q') {
        changeExplanation('프로그램을 종료합니다');
        setTimeout(() => initStageInfo(), 1000);
      } else {
        movePlayer(input);
        changeExplanation(getExplanation(input));
      }
      
      if (this.ballCount === 0) finishStage();
      if (++index === userInput.length) clearInterval(interval);
    }
    ```
   
    1. 2단계와 동일하게 입력값이 유효한지 확인하고, 플레이어가 이동할 좌표가 이동할 수 있는 좌표인지 확인한다. O이나 공백이면 이동이 가능하고, #은 이동이 불가능하며 o, 0인 경우에는 그다음 칸까지 확인하였다.
  
    ```javascript
    const checkNextPosition = (rowChange, colChange) => {
      const nextPosition = getNextPosition(rowChange, colChange);
      if (nextPosition === 1 || nextPosition === 5) return true;
      else if (nextPosition === 2 || nextPosition === 6) {
        const nextPositionFromCurrent = getNextPosition(rowChange * 2, colChange * 2);
        return nextPositionFromCurrent === 1 || nextPositionFromCurrent === 5;
      } else return false;
    };
    ```
   
    2. 입력값이 R, Q인 경우에는 각각 스테이지 초기화, 스테이지 종료를 수행한다.
  
    3. W, A, S, D가 제대로 입력되었다면 플레이어를 이동시킨다. 
  
    ```javascript
    const movePlayer = (input) => {
      setCurrentPosition();
      changePosition(moveData[input][0], moveData[input][1]);
      setMovedPosition(moveData[input][0], moveData[input][1]);
      this.moveCount++;
    };
    ```
   
    플레이어가 위치하던 좌표의 값을 가져와서 만약 플레이어가 O 위에 위치하고 있었다면 원래 있던 대로 O을 반환하고, 그렇지 않다면 공백을 넣어준다. 이후 현재 플레이어의 좌표를 변경하는 것은 2단계와 동일하다. 
   
    ```javascript
    const setCurrentPosition = () => {
      const originalMapPosition = this.stageInfos[this.currentStage].mapArray[this.currentPlayerPosition[0] - 1][this.currentPlayerPosition[1] - 1];
      if (originalMapPosition === 1) this.mapArray[this.currentPlayerPosition[0] - 1][this.currentPlayerPosition[1] - 1] = 1;
      else this.mapArray[this.currentPlayerPosition[0] - 1][this.currentPlayerPosition[1] - 1] = 5;
    }
    ```
   
    플레이어가 이동한 좌표의 값을 변경하기 위해 이동한 좌표를 가져온다. 이동한 좌표가 o이라면 그다음 칸이 O인지 확인하여 0이라면 그다음 칸에 0을 넣어주고, 그렇지 않으면 밀어낸 o을 넣어준다. 그리고 이동한 좌표가 0이었다면 o을 밀어내게되므로 그다음 칸에 o을 넣어준다. 그리고 공통적으로 이동한 좌표에 플레이어 P를 넣어준다.
   
    ```javascript
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
    ```
   
    4. 입력값 1개에 대한 처리를 마친 후 남아있는 볼 개수가 0이라면 해당 스테이지를 종료하도록 한다. 만약 해당 스테이지가 마지막 스테이지였다면 게임을 종료시키고, 그렇지 않으면 다음 스테이지로 넘어간다. 
  
    ```javascript
    const finishGame = () => {
      this.explanation = `모든 스테이지를 클리어하셨습니다!`;
      print();
    }
    
    const finishStage = () => {
      this.explanation = `Stage ${this.currentStage + 1} 클리어!`;
      print();
      this.currentStage++;
      if (this.currentStage === this.stageInfos.length) finishGame();
      else setTimeout(() => initStageInfo(this.currentStage), 1000);
    }
    ```
   
### 4단계 : 저장, 불러오기 기능

1. play 메소드에 S와 그다음 값으로 숫자가 들어오면 데이터를 저장하는 메소드를 호출하도록 하는 로직을 추가한다.

    ```javascript
    if (input === 'S' && Number(userInput[1])) {
      saveData(userInput);
    }
    ```
2. 사용자가 지정한 슬롯에 현재 진행상황 데이터를 저장한다. 입력된 숫자가 1에서 5 사이이면 해당 슬롯에 저장하고, 그 이외의 숫자가 입력될 경우에는 명령을 수행할 수 없다는 메시지를 전달한다.

    ```javascript
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
    ```

3. play 메소드에 L과 그다음 값으로 숫자가 들어오면 저장한 데이터를 불러오는 메소드를 호출하도록 하는 로직을 추가한다.

    ```javascript
    if (input === 'L' && Number(userInput[1])) {
      loadSavedData(userInput);
    }
    ```
   
4. 입력된 숫자가 1에서 5 사이이고, 해당 슬롯이 존재할 경우 (데이터가 저장되어있는 경우) 지정된 슬롯에서 데이터를 불러와 화면에 표시되도록 한다.

    ```javascript
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
    ```