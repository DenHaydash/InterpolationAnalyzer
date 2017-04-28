import React, { Component } from 'react';
import ElementPortal from 'react-element-portal';
import Konva from 'konva';

import * as pointTypes from '../../common/pointTypes';
import { toRealCoords } from '../../helpers/coordConverter';

import './drawer.scss';

const pointHighlightColor = '#03A9F4';

export default class Drawer extends Component {
    drawAxles() {
        const layer = new Konva.Layer();
            
        const xAxis = new Konva.Arrow({
            points: [
                0, this.stage.height() / 2,
                this.stage.width(), this.stage.height() / 2 
            ],
            stroke: 'black',
            fill: 'black',
            strokeWidth: 1
        });

        const yAxis = new Konva.Arrow({
            points: [
                this.stage.width() / 2, this.stage.height(),
                this.stage.width() / 2, 0
            ],
            stroke: 'black',
            fill: 'black',
            strokeWidth: 1
        });

        layer.add(xAxis);
        layer.add(yAxis);
            
        this.drawMarks(layer, this.stage.width(), this.stage.height());

        this.stage.add(layer);
    }

    getAxlesMarkupSteps(width, height) {
        const numberOfMarksX = 10,
              numberOfMarksY = 8;

        const stepX = width / numberOfMarksX,
              stepY = height / numberOfMarksY;

        return { stepX, stepY };
    }

    drawMarks(layer, width, height) {
        const { stepX, stepY } = this.getAxlesMarkupSteps(width, height);
        
        const markPositionShift = 5;

        for (let i = 1; i < width / stepX; i++) {
            const xMark = new Konva.Line({
                points: [
                    stepX * i, height / 2 - markPositionShift,
                    stepX * i, height / 2 + markPositionShift
                ],
                stroke: 'black',
                strokeWidth: 1
            });

            layer.add(xMark);
        }

        for (let i = 1; i < height / stepY; i++) {
            const yMark = new Konva.Line({
                points: [
                    width / 2 - markPositionShift, stepY * i,
                    width / 2 + markPositionShift, stepY * i
                ],
                stroke: 'black',
                strokeWidth: 1
            });

            layer.add(yMark);
        }
    }

    markUpAxles(width, height, scale) {
        const { stepX, stepY } = this.getAxlesMarkupSteps(width, height);

        this.axlesMarkUpLayer.destroyChildren();

        for (let i = 1; i < width / stepX; i++) {
            this.axlesMarkUpLayer.add(new Konva.Text({
                x: stepX * i - 10,
                y: height / 2 + 10,
                text: (-width / 2 + stepX * i) / scale.x,
                fontSize: 12,
                fontFamily: 'Arial',
                fill: 'black'
            }));
        }

        this.axlesMarkUpLayer.add(new Konva.Text({
            x: width - 10,
            y: height / 2 + 10,
            text: 'x',
            fontSize: 12,
            fontFamily: 'Arial',
            fill: 'black'
        }));

        for (let i = 1; i < height / stepY; i++) {
            this.axlesMarkUpLayer.add(new Konva.Text({
                x: width / 2 + 10,
                y: stepY * i - 5,
                text: (height / 2 - stepY * i) / scale.y,
                fontSize: 12,
                fontFamily: 'Arial',
                fill: 'black'
            }));
        }

        this.axlesMarkUpLayer.add(new Konva.Text({
            x: width / 2 + 10,
            y: 0,
            text: 'y',
            fontSize: 12,
            fontFamily: 'Arial',
            fill: 'black'
        }));

        this.axlesMarkUpLayer.add(new Konva.Text({
            x: width / 2 + 10,
            y: height / 2 + 10,
            text: '0',
            fontSize: 12,
            fontFamily: 'Arial',
            fill: 'black'
        }));
            
        this.axlesMarkUpLayer.draw();
    }

    drawPlot(points, highlightedPointId) {
        this.basePointsLayer.destroyChildren();
        this.computedPointsLayer.destroyChildren();

        for (const point of points.filter(p => p.type === pointTypes.base)) {
            const drawedPoint = new Konva.Circle({
                x: point.x,
                y: point.y,
                radius: 3,
                fill: 'black',
                strokeWidth: 0
            });

            if (point.id === highlightedPointId) {
                drawedPoint.fill(pointHighlightColor)
            }

            drawedPoint.on('mouseover', (e) => {
                this.tooltipTimeout = setTimeout(() => {
                    e.target.fill(pointHighlightColor);
                    e.target.draw();

                    const pointCoords = toRealCoords({x: e.target.attrs.x, y: e.target.attrs.y}, this.props.scale);

                    this.tooltipText.text(`{ x: ${pointCoords.x}; y: ${pointCoords.y} }`);
                    this.tooltip.show();
                    this.tooltipLayer.batchDraw();
                }, 100);
            });

            drawedPoint.on('mouseout', (e) => {
                clearTimeout(this.tooltipTimeout);

                e.target.fill('black');
                e.target.draw();
                
                this.tooltip.hide();
                this.tooltipLayer.draw();
            })

            this.basePointsLayer.add(drawedPoint);
        }

        for (const point of points.filter(p => p.type === pointTypes.calculated)) {
            const drawedPoint = new Konva.Circle({
                x: point.x,
                y: point.y,
                radius: 1,
                fill: '#00bcd4'
            });

            this.computedPointsLayer.add(drawedPoint);
        }

        this.basePointsLayer.draw(); 
        this.computedPointsLayer.draw();  
    }

    componentDidMount() {
        this.stage = new Konva.Stage({
            container: 'container',
            width: this.props.width,
            height: this.props.height
        });
        
        this.drawAxles();

        this.axlesMarkUpLayer = new Konva.Layer();
        this.basePointsLayer = new Konva.Layer();
        this.computedPointsLayer = new Konva.Layer();
        this.tooltipLayer = new Konva.Layer();

        this.tooltip = new Konva.Label({
            x: this.props.width - 100,
            y: 10,
            opacity: 0.75,
            visible: false
        });

        this.tooltip.add(new Konva.Tag({
            fill: pointHighlightColor
        }));

        this.tooltipText = new Konva.Text({
            text: '',
            fontFamily: 'Arial',
            fontSize: 12,
            padding: 5,
            fill: 'black'
        });

        this.tooltip.add(this.tooltipText);
        this.tooltipLayer.add(this.tooltip);

        this.stage.on('contentClick', this.props.onClick);

        this.stage.add(this.axlesMarkUpLayer, this.basePointsLayer, this.computedPointsLayer, this.tooltipLayer);

        this.renderPlot();
    }

    componentDidUpdate() {
        this.renderPlot();
    }

    renderPlot(){
        this.drawPlot(this.props.points, this.props.highlightedPointId);
        this.markUpAxles(this.props.width, this.props.height, this.props.scale);
    }

    render() {
        return (
            <div>
                <div id="container"></div>
                <ElementPortal id="info-portal">
                    <div>{this.props.info.split('\n')
                        .filter(p => p)
                        .map((p, i) => (
                            <span key={i}>{p}<br /></span>
                        ))}
                    </div>
                </ElementPortal>
            </div>
        );
    }
}

Drawer.propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
    info: React.PropTypes.string,
    points: React.PropTypes.arrayOf(React.PropTypes.shape({
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired,
        type: React.PropTypes.oneOf(Object.keys(pointTypes).map(t => pointTypes[t]))
    })),
    highlightedPointId: React.PropTypes.number,
    scale: React.PropTypes.shape({
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired
    })
};