import { width as canvasWidth, height as canvasHeight } from '../common/canvasSettings';

export function toCanvasCoords({x, y}, scale) {
    return {
        x: (x * scale.x + canvasWidth / 2),
        y: (canvasHeight / 2 - y * scale.y) 
    }
}

export function toRealCoords({x, y}, scale) {
    return {
        x: (x - canvasWidth / 2) / scale.x,
        y: (canvasHeight / 2 - y) / scale.y
    }
}