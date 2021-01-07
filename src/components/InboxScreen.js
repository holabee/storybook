import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PureTaskList from './TaskList';

export function PureInboxScreen({ error }) {
  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <div className="title-message">oh no!</div>
          <div className="subtitle-message">something went wrong</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">
          <span className="title-wrapper">Taskbox</span>
        </h1>
      </nav>
      <TaskList />
    </div>
  );
}

PureInboxScreen.propTypes = {
  error: PropTypes.string,
};

PureInboxScreen.defaultProps = {
  error: null,
};

export default connect(({ error }) => ({ error }))(PureInboxScreen);