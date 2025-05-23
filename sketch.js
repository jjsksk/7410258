let video;
let facemesh;
let predictions = [];
const indices = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
const indices2 = [76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184];
const indices3 = [133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153, 154, 155];
const indices4 = [243, 190, 56, 28, 27, 29, 30, 247, 130, 25, 110, 24, 23, 22, 26, 112];
const indices5 = [263, 466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249];
const indices6 = [359, 467, 260, 259, 257, 258, 286, 414, 463, 341, 256, 252, 253, 254, 339, 255];

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

    // 畫第一組線條（#fde4cf，粗細15）
    drawLine(indices, '#fde4cf', 15);

    // 畫第二組線條並填滿（#fbf8cc）
    drawShape(indices2, [255, 0, 0], 15, [251, 248, 204]); // 填充顏色修正為 #fbf8cc

    // 在第一組與第二組之間充滿#ffcfd2
    fill(255, 207, 210, 150); // 半透明#ffcfd2
    noStroke();
    beginShape();
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    for (let i = indices2.length - 1; i >= 0; i--) {
      const idx = indices2[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 畫第三組線條（#b9fbc0，粗細20）
    drawLine(indices3, '#b9fbc0', 20);

    // 畫第四組線條並填滿（#b9fbc0）
    drawShape(indices4, [185, 251, 192], 15, [185, 251, 192]); // 填充顏色修正為 #b9fbc0

    // 畫第五組線條（#b9fbc0，粗細20）
    drawLine(indices5, '#b9fbc0', 20);

    // 畫第六組線條並填滿（#b9fbc0）
    drawShape(indices6, [185, 251, 192], 15, [185, 251, 192]); // 填充顏色修正為 #b9fbc0
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

// 繪製線條的輔助函式
function drawLine(indices, color, weight) {
  const keypoints = predictions[0].scaledMesh;

  stroke(color);
  strokeWeight(weight);
  noFill();
  beginShape();
  for (let i = 0; i < indices.length; i++) {
    const idx = indices[i];
    const [x, y] = keypoints[idx];
    vertex(x, y);
  }
  endShape();
}
