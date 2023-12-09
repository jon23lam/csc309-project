export function formatErrors(error) {
  let errorString = '';

  for (let field in error) {
      if (error.hasOwnProperty(field)) {
          let messages = error[field].join(', ');
          errorString += `${capitalize(field)}: ${messages}\n`;
      }
  }

  return errorString.trim();
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}