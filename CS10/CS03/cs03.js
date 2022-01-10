// Mission 1

const videos = [];

class Video {
  constructor(title) {
    this.id = Math.random().toString(36).substr(2, 4);
    this.title = title;
    this.time = Math.ceil(Math.random() * 15);
    this.next = null;
  }
}

console.log('---영상 클립---');

for (let idx = 1; idx < 14; idx++) {
  const video = new Video(`제목${idx}`);
  videos.push(video);
  console.log(`${video.title}(${video.id}):${video.time}`);
}

// Mission 2

let head;

const checkCommand = (command, index) => {
  let isCommandValid = true;
  const commands = ['add', 'insert', 'delete', 'render'];

  if (!commands.includes(command.toLowerCase())) isCommandValid = false;

  if (command.toLowerCase() === 'insert' && !index) isCommandValid = false;

  return isCommandValid;
};

const isVideoExist = (id) => {
  return videos.some(video => video.id === id);
};

const printVideos = (tempHead = head) => {
  head = tempHead;
  let cur = head;
  let toBePrinted = '|';

  while (cur) {
    toBePrinted += `---[${cur.id}, ${cur.time}sec]`;
    cur = cur.next;
  }
  toBePrinted += '---[end]';

  console.log(toBePrinted);
};

const addVideo = (id) => {
  let toBeAdded = { ...videos.find(video => video.id === id) };

  if (head == null) head = toBeAdded;

  else {
    let cur = head;

    while (cur) {

      // 리스트 요소와 id가 동일할 때
      if (cur.id === id) {
        console.log('이미 추가된 영상입니다.');
        return;
      }

      // 마지막 요소일 때 추가
      if (cur.next === null) break;
      else cur = cur.next;
    }
    cur.next = toBeAdded;
  }
  printVideos();
};

const insertVideo = (id, index) => {
  let toBeInserted = { ...videos.find(video => video.id === id) };

  if (head == null) head = toBeInserted;

  else {
    let cur = head; // 순회할 때 사용하는 요소, 첫 요소인 head를 넣어줌
    let tempHead = cur; // 현재 리스트의 head 요소, 이후 원래 head의 값에 대입될 값
    let count = 0;

    while (cur) {

      // 리스트 요소와 id가 동일할 때
      if (cur.id === id) {
        console.log('이미 추가된 영상입니다.');
        return;
      }

      // head 자리에 요소를 삽입할 때
      if (parseInt(index) === 0) {
        let temp = { ...tempHead };
        tempHead = toBeInserted;
        tempHead.next = temp;
        printVideos(tempHead);
        return;
      }

      // 리스트 중간에 요소를 삽입할 때
      else if (count === parseInt(index) - 1) {
        toBeInserted.next = cur.next;
        cur.next = toBeInserted;
        printVideos(tempHead);
        return;
      }

      // 입력된 인덱스가 배열의 크기보다 커서 마지막 요소까지 왔을 때
      else if (cur.next === null) {
        cur.next = toBeInserted;
        printVideos(tempHead);
        return;
      }

      else {
        cur = cur.next;
        count++;
      }
    }
  }
  printVideos();
}

const deleteVideo = (id) => {
  let cur = head; // 순회할 때 사용하는 요소, 첫 요소인 head를 넣어줌
  let tempHead = cur; // 현재 리스트의 head 요소, 이후 원래 head의 값에 대입될 값

  while (cur) {

    // 삭제할 요소가 head일 때
    if (cur.id === id) {
      tempHead = cur.next;
      printVideos(tempHead);
      return;
    }

    // 중간에 있는 요소를 삭제할 때
    else if (cur.next.id === id) {
      cur.next = cur.next.next;
      printVideos(tempHead);
      return;
    }

    // id가 일치하지 않을 경우
    else {
      cur = cur.next;
    }
  }

  console.log('리스트에 존재하지 않는 영상입니다.');
}

const renderVideos = () => {
  let cur = head;
  let count = 0;
  let totalTime = 0;

  while (cur) {
    count++;
    totalTime += cur.time;
    cur = cur.next;
  }

  console.log(`영상 클립: ${count}개\n전체 길이: ${totalTime}sec`);
}

// 사용자에게 입력 받기

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt('> ');

rl.on('line', (line) => {

  const [command, id, index] = line.split(' ');

  if (command.toLowerCase() === 'exit') rl.close();

  else if (!checkCommand(command, index)) {
    console.log('잘못된 명령을 입력하셨습니다. 다시 입력해주십시오.');
    rl.prompt();
  }

  else if (command.toLowerCase() !== 'render' && !isVideoExist(id)) {
    console.log('존재하지 않는 영상입니다.');
    rl.prompt();
  }

  else {
    switch (command.toLowerCase()) {

      case 'add':
        addVideo(id);
        break;

      case 'insert':
        insertVideo(id, index);
        break;

      case 'delete':
        deleteVideo(id);
        break;

      case 'render':
        renderVideos();
        break;
    }
    rl.prompt();
  }
});

rl.prompt();