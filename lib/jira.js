const fetch = require('node-fetch');
const qs = require('querystring').stringify;
const debug = require('debug')('ausma:jira');

module.exports = function fetchJIRA(options) {
  const {projects, apiUrl, auth} = options;
  const query = {
    maxResults: 100,
    jql: `project IN (${projects.join(', ')}) AND statusCategory != 'Done'`,
  };
  debug(`downloading ${projects.join(', ')}`);
  return fetch(
    `${apiUrl}2/search?${qs(query)}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${Buffer.from(auth).toString('base64')}`,
      },
    }
  ).then((p) => p.json()).then((data) => data.issues.map((issue) => {
    const f = issue.fields;
    return {
      id: issue.id,
      key: issue.key,
      name: f.summary,
      project: f.project.name,
      type: f.issuetype.name,
      assignees: f.assignee ? [f.assignee.name] : [],
      status: f.status.name,
      source: 'JIRA',
      jira: issue,
    };
  })).then((issues) => {
    debug('completed JIRA fetch');
    return issues;
  });
};
