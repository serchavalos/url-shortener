/**
 * Regex taking from
 * @source https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
 */
function validateURL(url: string): boolean {
  return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/.test(
    url
  );
}

export { validateURL };
