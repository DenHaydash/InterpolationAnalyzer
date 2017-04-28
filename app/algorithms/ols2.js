import { getPolynomCoefficients } from './base/interpolation/ols';

export default function(points) {
    const polynomBasis = 2;
    const coefs = getPolynomCoefficients(points, polynomBasis);

    return {
        calculate: (x) => ({
            x,
            y: coefs[0] + coefs[1]*x + coefs[2] * Math.pow(x, 2)
        }),
        info: `
            Coefficients of parabola:
                a = ${coefs[2].toFixed(3)}
                b = ${coefs[1].toFixed(3)}
                c = ${coefs[0].toFixed(3)}
        `
    };
}