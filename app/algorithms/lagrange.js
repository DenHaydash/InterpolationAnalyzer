function calculateBasis(x, i, points) {
    let product = 1;

    for (let j = 0; j < points.length; j++) {
        if (j === i) {
            continue;
        }

        product *= (x - points[j].x) / (points[i].x - points[j].x);
    }

    return product;
}

function calculateLagrange(x, points) {
    return points.reduce((sum, p, i) => sum + p.y * calculateBasis(x, i, points), 0);
}

export default function(points) {
    return {
        calculate: (x) => ({
            x,
            y: calculateLagrange(x, points)
        })
    };
}