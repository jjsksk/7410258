# ml5.js Project

This project utilizes the ml5.js library to create a canvas that displays facial keypoints using the facemesh model. The canvas is set to a resolution of 640x480 pixels and is centered in the window.

## Project Structure

```
ml5js-project
├── src
│   ├── sketch.js
├── index.html
└── README.md
```

## Description

The `sketch.js` file contains the main code for the project. It initializes a canvas and uses the facemesh model to detect facial landmarks. The project connects specific facial keypoints with lines, creating visual representations of the detected features.

### Features

- A canvas of size 640x480 pixels, centered in the window.
- Connection of facial keypoints using the `line` function:
  - The first group of points (IDs: 409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291) is connected with red lines of thickness 15.
  - The second group of points (IDs: 76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184) is connected with yellow lines.
  - The area between the first and second groups is filled with green color.

## Usage

1. Ensure you have an internet connection to load the ml5.js library from the CDN.
2. Open `index.html` in a web browser to view the canvas and the facial keypoints visualization.

## Dependencies

- [ml5.js](https://ml5js.org/) - A friendly machine learning library for the web.