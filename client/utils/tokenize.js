// function to tokenize sentences

function tokenizePassage(stringPassage) {

  //replace breaks
  let tokens = stringPassage.split(' ')
  tokens = tokens.filter(token => token !== '')

  return tokens
}


module.exports = { tokenizePassage }
