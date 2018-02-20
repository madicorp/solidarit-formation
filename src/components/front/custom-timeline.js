import React from 'react';
import Timeline from 'react-calendar-timeline/lib';
import CustomTimelineHeader from './custom-timeline-header'

export default class CustomTimeline extends Timeline {

    header(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, headerLabelGroupHeight, headerLabelHeight) {
        return (
            <CustomTimelineHeader canvasTimeStart={canvasTimeStart}
                                  hasRightSidebar={this.props.rightSidebarWidth > 0}
                                  canvasTimeEnd={canvasTimeEnd}
                                  canvasWidth={canvasWidth}
                                  lineHeight={this.props.lineHeight}
                                  minUnit={"day"}
                                  timeSteps={timeSteps}
                                  headerLabelGroupHeight={headerLabelGroupHeight}
                                  headerLabelHeight={headerLabelHeight}
                                  width={this.state.width}
                                  zoom={zoom}
                                  visibleTimeStart={this.state.visibleTimeStart}
                                  visibleTimeEnd={this.state.visibleTimeEnd}
                                  headerPosition={this.state.headerPosition}
                                  fixedHeader={this.props.fixedHeader}
                                  stickyOffset={this.props.stickyOffset}
                                  showPeriod={this.showPeriod}
                                  headerLabelFormats={this.props.headerLabelFormats}
                                  subHeaderLabelFormats={this.props.subHeaderLabelFormats}/>
        )
    }
}