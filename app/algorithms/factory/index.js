import * as availabeMethods from '../../common/availableMethods';

import ols1 from '../ols1';
import ols2 from '../ols2';
import linear from '../linear';
import lagrange from '../lagrange';
import gauss from '../gauss';
import parametricGauss from '../parametricGauss';
import aggregatedGauss from '../aggregatedGauss';

const methods = {
    [availabeMethods.ols1.type]: ols1,
    [availabeMethods.ols2.type]: ols2,
    [availabeMethods.linear.type]: linear,
    [availabeMethods.lagrange.type]: lagrange,
    [availabeMethods.gauss.type]: gauss,
    [availabeMethods.paramenticGauss.type]: parametricGauss,
    [availabeMethods.aggregatedGauss.type]: aggregatedGauss
};

export default function(type) {
    return methods[type] || ols1;
}