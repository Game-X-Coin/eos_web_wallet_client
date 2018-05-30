import { message } from 'antd';

exports.showApiError = function (errorParam) {
  let str = '';
  const errors = errorParam.response.data;
  if (errors.errors) {
    str = errors.errors.map(error => error.messages.join('\n'));
  } else if (errors.messages) {
    str = errors.map(x => x.messages.join(' ')).join('\n');
  } else if (errors.message) {
    str = errors.message;
  }
  message.error(str);
};
