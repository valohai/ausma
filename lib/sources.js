const fetchTrello = require('./trello');
const fetchJIRA = require('./jira');
const fetchGithub = require('./github');

module.exports = function getSourcePromises() {
  const sources = [];
  if (process.env.TRELLO_KEY && process.env.TRELLO_BOARDS) {
    sources.push(fetchTrello({
      key: process.env.TRELLO_KEY,
      token: process.env.TRELLO_TOKEN,
      boards: process.env.TRELLO_BOARDS.split(/,\s*/),
    }));
  }

  if (process.env.JIRA_API_URL && process.env.JIRA_PROJECT_IDS) {
    sources.push(fetchJIRA({
      apiUrl: process.env.JIRA_API_URL,
      auth: process.env.JIRA_BASIC_AUTH,
      projects: process.env.JIRA_PROJECT_IDS.split(/,\s*/),
    }));
  }

  if (process.env.GITHUB_AUTH && process.env.GITHUB_REPOS) {
    sources.push(fetchGithub({
      auth: process.env.GITHUB_AUTH,
      repos: process.env.GITHUB_REPOS.split(/,\s*/),
    }));
  }

  return sources;
};
