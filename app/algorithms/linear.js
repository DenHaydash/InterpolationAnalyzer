function getBoundariesForX(x, points) {
    for (let i = 0; i < points.length - 1; i++) {
        if (x >= points[i].x && x <= points[i + 1].x) {
            return {
                leftPoint: points[i],
                rightPoint: points[i + 1]
            };
        }
    }
}

function getA1({leftPoint, rightPoint}) {
    return (rightPoint.y - leftPoint.y) / (rightPoint.x - leftPoint.x);
}

function getA0(leftPoint, a1) {
    return leftPoint.y - leftPoint.x * a1;
}

export default function(points) {
    return {
        calculate: (x) => {
            const boundaries = getBoundariesForX(x, points);

            const a1 = getA1(boundaries),
                  a0 = getA0(boundaries.leftPoint, a1);

            return {
                x,
                y: a0 + a1*x
            };
        }
    };
}