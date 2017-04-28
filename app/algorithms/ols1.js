import { getPolynomCoefficients } from './base/interpolation/ols';

export default function(points) {
    const polynomBasis = 1;
    const coefs = getPolynomCoefficients(points, polynomBasis);

    return {
        calculate: (x) => ({
            x,
            y: coefs[0] + coefs[1]*x
        }),
        info: `
            Coefficients of line:
            a = ${coefs[1].toFixed(3)}
            b = ${coefs[0].toFixed(3)}
        `
    };
}