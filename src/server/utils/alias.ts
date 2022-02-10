function validateAlias(alias: string): boolean {
  return /^[a-zA-Z0-9\-_]+$/g.test(alias);
}

function generateAlias(length = 5): string {
  const possibleChars = "abcdefghijklmnopqrstuvwxyz0123456789-_";
  const charsLength = possibleChars.length;
  let alias = "";

  for (let i = 0; i < length; i++) {
    const randomPosition = Math.floor(Math.random() * charsLength);
    alias += possibleChars.charAt(randomPosition);
  }

  return alias;
}

export { validateAlias, generateAlias };
