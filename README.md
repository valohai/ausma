# Ausma

Trello and JIRA status, served fresh every morning

## How to run

* Make sure the below environment variables are configured, either in an `.env` file
  or as real environment variables.
* Run `node index.js`. :tada:
* If everything seems alright, set up crontab (or some other scheduling).
  For instance, `30 7 * * 1-5 node index.js` would run Ausma at 7:30 server time from 
  Monday to Friday.

## Configuration

### General

* `USER_MAP`: Optional username map (`from=to,from=to,from=to,...`)
* `STATUSES`: Comma-separated status strings to consider. For Trello, this maps to list name. (`To Do,Doing,Blocked`)

### Slack

* `SLACK_TOKEN`: Slack token. `xoxb-...`
* `SLACK_CHANNEL`: Slack channel name or ID. (`#general`)

### Trello

* `TRELLO_KEY`: Trello app key (`ff33cc33aa...`). Get yours from https://trello.com/app-key
* `TRELLO_TOKEN`: Trello auth token (`ff33cc33aa...`). Get yours from https://trello.com/app-key too.
* `TRELLO_BOARDS`: Trello board IDs to consider, comma separated (`hex...,hex...,hex...`). You can get these from https://trello.com/1/Members/me?boards=open%2Cstarred once you're logged in on Trello.

### JIRA

* `JIRA_API_URL`: JIRA API URL. Something like https://company.atlassian.net/rest/api/
* `JIRA_BASIC_AUTH`: JIRA basic auth string. (`username:password`)
* `JIRA_PROJECT_IDS`: JIRA project IDs to consider. Find these at the `rest/api/2/project` endpoint.

### GitHub

* `GITHUB_AUTH`: GitHub basic auth string. Please use a Personal Access Token with read rights only. (`username:token`)
* `GITHUB_REPOS`: Fully qualified repo names, comma-separated (`valohai/ausma,jquery/jquery`)
