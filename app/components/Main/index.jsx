import React, { PureComponent } from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import classNames from 'classnames';

import styles from './main.scss';

import ListContainer from '../ListContainer';
import DrawerContainer from '../DrawerContainer';
import PointsFormContainer from '../PointsFormContainer';
import MethodSelectorContainer from '../MethodSelectorContainer';
import ModeSwitcherContainer from '../ModeSwitcherContainer';

export default class Main extends PureComponent {
    render() {
        return (
            <div className={styles.main}>
                <Paper zDepth={2} rounded={false}>
                    <div className={styles.row}>
                        <div className={classNames(styles.col, styles.w60)}>
                            <Subheader>Plot</Subheader>
                            <DrawerContainer />
                        </div>
                        <div className={classNames(styles.col, styles.w30)}>
                            <div className={styles.row}>
                                <Subheader>Points</Subheader>
                                <div className={styles.pointsBlock}>
                                    <ListContainer />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <Subheader>Info</Subheader>
                                <div className={styles.infoBlock} id="info-portal">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>                      
                        <div className={classNames(styles.col, styles.w30)}>                            
                            <MethodSelectorContainer />
                        </div>
                        <div className={classNames(styles.col, styles.w30)}>
                            <ModeSwitcherContainer />
                        </div>
                        <div className={classNames(styles.col, styles.w30)}>
                            <PointsFormContainer />
                        </div>  
                    </div>
                </Paper>
            </div>
        );
    }
}