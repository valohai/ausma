# ausma

Trello and JIRA status, served fresh every morning

## configuration

* `SLACK_TOKEN`: Slack token. `xoxb-...`
* `SLACK_CHANNEL`: Slack channel name or ID.
* `TRELLO_KEY`: Trello app key. Get yours from https://trello.com/app-key
* `TRELLO_TOKEN`: Trello auth token. Get yours from https://trello.com/app-key too.
* `TRELLO_BOARDS`: Trello board IDs to consider, comma separated.
* `JIRA_API_URL`: JIRA API URL. Something like https://company.atlassian.net/rest/api/
* `JIRA_BASIC_AUTH`: JIRA basic auth string. (`username:password`)
* `JIRA_PROJECT_IDS`: JIRA project IDs to consider. Find these at `rest/api/2/project`
* `USER_MAP`: Optional username map (`from=to,from=to,from=to,...`)
* `STATUSES`: Comma-separated statuses to output
