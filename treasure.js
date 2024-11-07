// treasure.js
class TreasureMap {
  static getInitialClue() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("在古老的图书馆里找到了第一个线索...");
      }, 1000);
    });
  } 

  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue) {
          reject("没有线索可以解码!");
        }
        resolve("解码成功!宝藏在一座古老的神庙中...");
      }, 1500);
    });
  }

  static searchTemple(location) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.5) {
          reject("糟糕!遇到了神庙守卫!寻宝失败");
          
        }
        resolve("找到了一个神秘的箱子...");
      }, 2000);
    });
  }

  static solveRiddle(riddle) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.5) {
          reject("谜题太复杂了，解不开!");
        }
        resolve("谜题解开，箱子打开了!");
      }, 1500);
    });
  }

  static openTreasureBox() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("恭喜!你找到了传说中的宝藏!");
      }, 1000);
    });
  }
}



function changeBackground(imagePath) {
  document.body.style.backgroundImage = `url('${imagePath}')`;
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundSize = 'cover';
}

function showTreasureBox(imagePath) {
  // 创建一个新的图片元素
  var treasureBoxImage = new Image();
  treasureBoxImage.src = imagePath; // 使用传入的图片路径
  treasureBoxImage.style.position = 'absolute'; // 使用绝对定位
  treasureBoxImage.style.left = '70%'; // 将图片的左边定位到屏幕中心
  treasureBoxImage.style.top = '50%'; // 将图片的顶部定位到屏幕中心
 // treasureBoxImage.style.transform = 'translate(-50%)'; // 使用transform进行微调，确保图片中心与屏幕中心对齐
  treasureBoxImage.style.zIndex = 1000; // 设置较高的z-index，确保图片在顶层

  // 将图片添加到body中
  document.body.appendChild(treasureBoxImage);
}

async function findTreasureWithAsyncAwait() {
  const storyElement = document.getElementById('story');
  
  try {
    // 获取初始线索，并改变背景为图书馆
    const initialClue = await TreasureMap.getInitialClue();
    storyElement.innerHTML += `<p>${initialClue}</p>`;
    changeBackground('image/图书馆.jpeg'); // 替换为图书馆图片路径

    // 解码线索，并改变背景为神庙
    const location = await TreasureMap.decodeAncientScript(initialClue);
    storyElement.innerHTML += `<p>${location}</p>`;
    changeBackground('image/神庙1.jpeg'); // 替换为神庙图片路径

    
    // 在神庙中搜索宝箱，并显示宝箱图片
    const box = await TreasureMap.searchTemple(location);
    storyElement.innerHTML += `<p>${box}</p>`;
    showTreasureBox('image/宝箱关.png'); // 替换为宝箱图片路径

    // 解开谜题，并显示打开的宝箱图片
    const riddle = "一个古老箱子的谜题";
    const answer = await TreasureMap.solveRiddle(riddle);
    storyElement.innerHTML += `<p>${answer}</p>`;
    showTreasureBox('image/宝箱开.png'); // 替换为打开的宝箱图片路径

    
  } catch (error) {
    storyElement.innerHTML += `<p class="error">任务失败: ${error}</p>`;
    hidePopup(); // 发生错误时隐藏宝箱图片
  }
}

document.getElementById('startButton').addEventListener('click', findTreasureWithAsyncAwait);
