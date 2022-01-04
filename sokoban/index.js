const input =
`Stage 1
#####
#OoP#
#####
=====
Stage 2
  #######
###  O  ###
#    o    #
# Oo P oO #
###  o  ###
 #   O  # 
 ########`;

// 텍스트를 스테이지 배열로 변환
export const textToStageArray = (input) => {
  return input.split('\n=====\n').map(stage => stage.split('\n'));
};

// 지도의 가로, 세로 길이 계산
const getLength = (stage) => {
  const rowLength = Math.max(...stage.map((row, index) => {
    if (index === 0) return 0;
    else return row.length;
  }));
  const colLength = stage.length - 1;
  return [rowLength, colLength];
};

// 지도에서 스테이지 정보 추출
const getMapInfo = (stage, initArray) => {
  const mapInfo = {
    stage: 0,
    playerPosition: [],
    ballCount: 0,
    mapArray: initArray,
  };
  
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
          mapInfo.playerPosition = [rowIndex, elemIndex + 1];
          mapInfo.mapArray[rowIndex - 1][elemIndex] = 3;
          return;
        default:
          return;
      }
    });
  });
  return mapInfo;
};

// 스테이지 정보 객체를 반환
export const getStageInfos = (stages) => {
  return stages.map((stage) => {
    const [rowLength, colLength] = getLength(stage);
    const initArray = Array.from({ length: colLength }, () => Array(rowLength).fill(5));
    const mapInfo = getMapInfo(stage, initArray);
    return {
      rowLength: rowLength,
      colLength: colLength,
      ...mapInfo,
    };
  });
};

// 스테이지 정보를 취합하여 출력
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
플레이어 위치 (${stageInfo.playerPosition[0]}, ${stageInfo.playerPosition[1]})\n
`;
  });
  
  console.log(combinedInfo);
};

const init = () => {
  console.log('STEP 1');
  const stages = textToStageArray(input);
  const stageInfos = getStageInfos(stages);
  printStageInfo(stages, stageInfos);
};

init();