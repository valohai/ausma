const sortBy = require('lodash/sortBy');

function filterAndGroup(options, issues) {
  return new Promise((resolve) => {
    const grouped = {};
    issues
      .filter((issue) => issue.assignees && issue.assignees.length > 0)
      .filter((issue) => options.statuses.indexOf(issue.status) > -1)
      .forEach((issue) => {
        issue.assignees.forEach((assignee) => {
          const mappedAssignee = options.userMap[assignee] || assignee;
          const groupKey = `${issue.source}/${mappedAssignee}`;
          (grouped[groupKey] || (grouped[groupKey] = [])).push(issue);
        });
      });
    resolve(grouped);
  });
}

function formatGroupedIssues(options, grouped) {
  return new Promise((resolve) => {
    const messageLines = Object.keys(grouped).sort().map((groupKey) => {
      const issuesText =
        sortBy(grouped[groupKey], (i) => `${i.status},${i.name}`)
          .map((issue) => `${issue.key ? `${issue.key} - ` : ''}${issue.name} (${issue.status})`)
          .join(' :large_orange_diamond: ');
      return `${groupKey} :point_right: ${issuesText}`;
    });
    resolve(messageLines.join('\n'));
  });
}

module.exports = function formatMessage(options, issues) {
  return filterAndGroup(options, issues).then(
    (grouped) => formatGroupedIssues(options, grouped)
  );
};
