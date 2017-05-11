import ols1 from './ols1';
import ols2 from './ols2';

export default function(points) {
    const ols1Algorithm = ols1(points);
    const ols2Algorithm = ols2(points);

    return {
        calculate: (x) => (
            [
                ols1Algorithm.calculate(x),
                ols2Algorithm.calculate(x)
            ]),
        info: `
            ${ols1Algorithm.info}\n\n
            ${ols2Algorithm.info}
        `
    };
}