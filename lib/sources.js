const fetchTrello = require('./trello');
const fetchJIRA = require('./jira');

module.exports = function getSourcePromises() {
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
  return sources;
};
