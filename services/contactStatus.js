const STATUSES = ['new', 'in_progress', 'resolved'];

const LABELS = {
  new: '新規',
  in_progress: '対応中',
  resolved: '解決済み',
};

function isValidStatus(status) {
  return STATUSES.includes(status);
}

function labelFor(status) {
  return LABELS[status];
}

module.exports = { STATUSES, isValidStatus, labelFor };
