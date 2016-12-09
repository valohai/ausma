const fetch = require('node-fetch');
const Promise = require('bluebird');
const qs = require('querystring').stringify;
const debug = require('debug')('ausma:trello');

const apiBase = 'https://api.trello.com/1/';

function getBoardCardSummary(key, token, boardId) {
  debug(`downloading ${boardId}`);
  const board = fetch(`${apiBase}boards/${boardId}?${qs({key, token, lists: 'open'})}`).then((p) => p.json());
  const cards = fetch(`${apiBase}boards/${boardId}/cards?${qs({
    key,
    token,
    members: true,
    fields: 'idList,name,idMembers',
  })}`).then((p) => p.json());
  return Promise.props({board, cards}).then((data) => {
    const lists = new Map(data.board.lists.map((l) => [l.id, l]));
    return data.cards.map((card) => {
      const list = lists.get(card.idList);
      return {
        id: card.id,
        name: card.name,
        assignees: card.members.map((m) => m.username),
        status: list.name,
        project: data.board.name,
        type: null,
        source: 'Trello',
        trello: card,
        trelloList: list,
        trelloBoard: data.board,
      };
    });
  }).then((issues) => {
    debug(`completed ${boardId}`);
    return issues;
  });
}

module.exports = function fetchTrello(options) {
  const {key, token, boards} = options;
  return Promise.map(
    boards, (boardId) => getBoardCardSummary(key, token, boardId)
  ).then((summaries) => summaries.reduce((coll, a) => coll.concat(a), []));
};
