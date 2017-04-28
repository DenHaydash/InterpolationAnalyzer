export function calculateAlpha(n, xmin, xmax) {
    return Math.PI * (n - 1) / Math.pow(xmax - xmin, 2);
}

export function calculatePower(x, xi, alpha) {
    return -alpha * Math.pow(x - xi, 2);
}

export function calculateBasisCoefs(points, alpha, selector) {
    return points.map(pt => 
        points.map(p => 
            Math.pow(Math.E, calculatePower(selector(pt), selector(p), alpha))
        )
    );
}

export function calculateGauss(points, roots, alpha, selector) {
    return function(x) {
        return roots.reduce(
            (sum, y, i) => sum + y*Math.pow(Math.E, calculatePower(x, selector(points[i]), alpha)), 0);
    }
}