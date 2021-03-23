/**
 * エラー表示
 */
const notifyError = () => {
  const notify = require(`gulp-notify`);
  return notify.onError({
    title: "Gulp エラー",
    message: "Error: <%= error.message %>",
    sound: "Basso"
  });
};

module.exports = notifyError;