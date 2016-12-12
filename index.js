require('dotenv').config({silent: true});
const formatMessage = require('./lib/format');
const postToSlack = require('./lib/slack');
const parseQs = require('querystring').parse;
const flatten = require('lodash/flatten');
const getSourcePromises = require('./lib/sources');

const formatOptions = {
  statuses: (process.env.STATUSES || 'In Progress').split(/,\s*/g),
  userMap: parseQs((process.env.USER_MAP || ''), ',', '='),
};

Promise.all(getSourcePromises()).then(
  (issueLists) => flatten(issueLists)
).then(
  (issues) => formatMessage(formatOptions, issues)
).then((message) => {
  console.log(message);  // eslint-disable-line no-console
  if (process.env.SLACK_TOKEN && process.env.SLACK_CHANNEL) {
    postToSlack({
      token: process.env.SLACK_TOKEN,
      channel: process.env.SLACK_CHANNEL,
    }, message);
  }
});
