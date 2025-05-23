let video;
let facemesh;
let predictions = [];
const indices = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
const indices2 = [76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184];

function setup() {
  createCanvas(640, 480).position(
    (windowWidth - 640) / 2,
    (windowHeight - 480) / 2
  );
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh 模型載入完成！");
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 畫第一組紅色線
    drawShape(indices, [255, 0, 0], 15, null);

    // 畫第二組紅色線並填滿黃色
    drawShape(indices2, [255, 0, 0], 15, [255, 255, 0, 200]);

    // 在第一組與第二組之間充滿綠色
    fill(0, 255, 0, 150); // 半透明綠色
    noStroke();
    beginShape();
    // 先畫第一組
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    // 再畫第二組（反向，避免交錯）
    for (let i = indices2.length - 1; i >= 0; i--) {
      const idx = indices2[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

// 繪製形狀的輔助函式
function drawShape(indices, strokeColor, strokeWeightValue, fillColor) {
  const keypoints = predictions[0].scaledMesh;

  if (fillColor) {
    fill(...fillColor);
  } else {
    noFill();
  }

  stroke(...strokeColor);
  strokeWeight(strokeWeightValue);
  beginShape();
  for (let i = 0; i < indices.length; i++) {
    const idx = indices[i];
    const [x, y] = keypoints[idx];
    vertex(x, y);
  }
  endShape(CLOSE);
}
