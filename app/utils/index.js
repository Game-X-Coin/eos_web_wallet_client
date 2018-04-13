import { message } from 'antd';

exports.showApiError = function (errors) {
  let _message = '';
  if (errors.errors) {
    _message = errors.errors.map(error => error.messages.join('\n'));
  } else if (errors.messages) {
    _message = errors.map(x => x.messages.join(' ')).join('\n');
  } else if (errors.message) {
    _message = errors.message;
  }
  message.error(_message);
}
