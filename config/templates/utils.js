/**
 * replaces returns and tubes to make the input compatible with markdown
 * @param input
 */
function mdclean(input) {
  return input.replace(/\r?\n/g, "<br>").replace(/\|/g, "\\|");
}

const EMPTY_VALUE = "-";

module.exports = {
  mdclean,
  EMPTY_VALUE
};
