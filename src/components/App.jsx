import React, { Component } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  options = ['good', 'neutral', 'bad'];

  handleLeaveFeedback = option => {
    this.setState(prevState => ({ [option]: prevState[option] + 1 }));
  };

  countTotalFeedback = () =>
    this.state.good + this.state.neutral + this.state.bad;

  countPositiveFeedbackPercentage = () => {
    const total = this.countTotalFeedback();
    const { good } = this.state;
    return total === 0 ? 0 : Math.round((good / total) * 100);
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const isFeedbackGiven = total > 0;

    return (
      <div>
        <Section title="Please leave your feedback">
          <FeedbackOptions
            options={this.options}
            onLeaveFeedback={this.handleLeaveFeedback}
          />
          {isFeedbackGiven && (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          )}
          {!isFeedbackGiven && (
            <>
              <h2>Statistics</h2>
              <Notification message="No feedback given" />
            </>
          )}
        </Section>
      </div>
    );
  }
}
