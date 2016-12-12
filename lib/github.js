const fetch = require('node-fetch');
const Promise = require('bluebird');
const qs = require('querystring').stringify;
const debug = require('debug')('ausma:github');

const apiBase = 'https://api.github.com/';

const mapPRtoIssue = (pr) => ({
  source: 'github',
  githubPr: pr,
  id: pr.id,
  name: pr.title,
  key: `#${pr.number}`,
  status: 'PR',
  assignees: (pr.assignees || []).map((ass) => ass.login),
});

function getPRSummary(auth, repo) {
  debug(`downloading ${repo}`);
  return fetch(
    `${apiBase}repos/${repo}/pulls?${qs({state: 'open'})}`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Basic ${Buffer.from(auth).toString('base64')}`,
      },
    }
  )
    .then((p) => p.json())
    .then((data) => data.map(mapPRtoIssue))
    .then((issues) => {
      debug(`completed ${repo}`);
      return issues;
    });
}

module.exports = function fetchGithub(options) {
  const {auth, repos} = options;
  return Promise.map(
    repos, (repo) => getPRSummary(auth, repo)
  ).then((summaries) => summaries.reduce((coll, a) => coll.concat(a), []));
};
