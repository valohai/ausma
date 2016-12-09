const fetch = require('node-fetch');
const qs = require('querystring').stringify;
const debug = require('debug')('ausma:slack');

module.exports = function postMessage(options, message) {
  const query = qs({
    token: options.token,
    channel: options.channel,
    text: message,
    unfurl_links: 'false',
    as_user: 'false',
    username: 'Ausma Bot',
    icon_emoji: ':city_sunrise:',
  });
  debug(`posting to ${options.channel}`);
  return (
    fetch(`https://slack.com/api/chat.postMessage?${query}`, {method: 'POST'})
      .then((r) => r.json())
      .then((data) => {
        debug(`posting to ${options.channel} complete: ${data}`);
        if (!data.ok) throw new Error(`Slack says no: ${JSON.stringify(data)}`);
        return data;
      })
  );
};
