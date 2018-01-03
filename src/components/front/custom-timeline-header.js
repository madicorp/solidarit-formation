import React from 'react';
import Header from 'react-calendar-timeline/lib/lib/layout/Header'
import { iterateTimes, getNextUnit } from 'react-calendar-timeline/lib/lib/utils'


export  default class CustomTimelineHeader extends Header {
    render () {
        let timeLabels = []
        const {
            canvasTimeStart, canvasTimeEnd, canvasWidth, lineHeight,
            visibleTimeStart, visibleTimeEnd, minUnit, timeSteps, fixedHeader, stickyOffset, headerPosition,
            headerLabelGroupHeight, headerLabelHeight, hasRightSidebar, width
        } = this.props

        const ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)
        const twoHeaders = minUnit !== 'year'

        const correctLeftPositions = fixedHeader === 'fixed' || (fixedHeader === 'sticky' && headerPosition === 'fixed')

        // add the top header
        if (twoHeaders) {
            const nextUnit = getNextUnit(minUnit)

            iterateTimes(visibleTimeStart, visibleTimeEnd, nextUnit, timeSteps, (time, nextTime) => {
                const startTime = Math.max(visibleTimeStart, time.valueOf())
                const endTime = Math.min(visibleTimeEnd, nextTime.valueOf())
                const left = Math.round((startTime.valueOf() - canvasTimeStart) * ratio, -2)
                const right = Math.round((endTime.valueOf() - canvasTimeStart) * ratio, -2)
                const labelWidth = right - left
                const leftCorrect = correctLeftPositions ? Math.round((canvasTimeStart - visibleTimeStart) * ratio) - 1 : 0

                timeLabels.push(
                    <div key={`top-label-${time.valueOf()}`}
                         href='#'
                         className={`rct-label-group${hasRightSidebar ? ' rct-has-right-sidebar' : ''}`}
                         data-time={time}
                         data-unit={nextUnit}
                         style={{
                             left: `${left + leftCorrect}px`,
                             width: `${labelWidth}px`,
                             height: `${headerLabelGroupHeight}px`,
                             lineHeight: `${headerLabelGroupHeight}px`,
                             cursor: 'pointer'
                         }}>
                        {this.headerLabel(time, nextUnit, labelWidth)}
                    </div>
                )
            })
        }

        iterateTimes(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, (time, nextTime) => {
            const left = Math.round((time.valueOf() - canvasTimeStart) * ratio, -2)
            const minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit)
            const firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0)
            const labelWidth = Math.round((nextTime.valueOf() - time.valueOf()) * ratio, -2)
            const borderWidth = firstOfType ? 2 : 1
            const leftCorrect = correctLeftPositions ? Math.round((canvasTimeStart - visibleTimeStart) * ratio) - borderWidth + 1 : 0

            timeLabels.push(
                <div key={`label-${time.valueOf()}`}
                     href='#'
                     className={`rct-label ${twoHeaders ? '' : 'rct-label-only'} ${firstOfType ? 'rct-first-of-type' : ''} ${(minUnit !== 'month' ? `rct-day-${time.day()}` : '')} `}
                     data-time={time}
                     data-unit={minUnit}
                     style={{
                         top: `${minUnit === 'year' ? 0 : headerLabelGroupHeight}px`,
                         left: `${left + leftCorrect}px`,
                         width: `${labelWidth}px`,
                         height: `${(minUnit === 'year' ? headerLabelGroupHeight + headerLabelHeight : headerLabelHeight)}px`,
                         lineHeight: `${(minUnit === 'year' ? headerLabelGroupHeight + headerLabelHeight : headerLabelHeight)}px`,
                         fontSize: `${(labelWidth > 30 ? '14' : labelWidth > 20 ? '12' : '10')}px`,
                         cursor: 'pointer'
                     }}>
                    {this.subHeaderLabel(time, minUnit, labelWidth)}
                </div>
            )
        })

        let headerStyle = {
            height: `${headerLabelGroupHeight + headerLabelHeight}px`,
            lineHeight: `${lineHeight}px`
        }

        if (fixedHeader === 'fixed') {
            headerStyle.position = 'fixed'
            headerStyle.width = `${width}px`
        } else if (fixedHeader === 'sticky') {
            if (headerPosition === 'top') {
                // do nothing, keep at the top
            } else if (headerPosition === 'fixed') {
                headerStyle.position = 'fixed'
                headerStyle.top = stickyOffset
                headerStyle.width = `${width}px`
            } else if (headerPosition === 'bottom') {
                headerStyle.position = 'absolute'
                headerStyle.bottom = 0
                headerStyle.width = `${canvasWidth}px`
            }
        }

        return (
            <div ref='header'
                 key='header'
                 className='rct-header'
                 onTouchStart={this.touchStart}
                 onTouchEnd={this.touchEnd}
                 style={headerStyle}>
                {timeLabels}
            </div>
        )
    }
}
