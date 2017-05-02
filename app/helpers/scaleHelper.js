import { width as canvasWidth, height as canvasHeight } from '../common/canvasSettings';

function roundBy(value, step) {
    return Math.ceil(value / step) * step;
}

export function computeScaleFactor(maxX, maxY) {
    const roundedMaxX = roundBy(maxX, 50),
          roundedMaxY = roundBy(maxY, 50);

    return {
        x: canvasWidth / 2 > roundedMaxX ? 1 : canvasWidth / 2 / roundedMaxX,
        y: canvasHeight / 2 > roundedMaxY ? 1 : canvasHeight / 2 / roundedMaxY
    }
}