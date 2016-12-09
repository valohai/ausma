require('dotenv').config();
const fetchTrello = require('./lib/trello');
const fetchJIRA = require('./lib/jira');
const formatMessage = require('./lib/format');
const postToSlack = require('./lib/slack');
const parseQs = require('querystring').parse;
const flatten = require('lodash/flatten');


const sources = [];
if (process.env.TRELLO_KEY && process.env.TRELLO_BOARDS) {
  sources.push(fetchTrello({
    key: process.env.TRELLO_KEY,
    token: process.env.TRELLO_TOKEN,
    boards: process.env.TRELLO_BOARDS.split(/,\s+/),
  }));
}

if (process.env.JIRA_API_URL && process.env.JIRA_PROJECT_IDS) {
  sources.push(fetchJIRA({
    apiUrl: process.env.JIRA_API_URL,
    auth: process.env.JIRA_BASIC_AUTH,
    projects: process.env.JIRA_PROJECT_IDS.split(/,\s+/),
  }));
}

const formatOptions = {
  statuses: (process.env.STATUSES || 'In Progress').split(/,\s*/g),
  userMap: parseQs((process.env.USER_MAP || ''), ',', '='),
};

Promise.all(sources).then(
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
