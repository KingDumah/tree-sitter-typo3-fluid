/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "typo3_fluid",

  extras: $ => [/\s+/, $.comment],

  rules: {
    source_file: $ => repeat(choice(
      $.fluid_expression,
      $.text
    )),

    // { ... } expressions used in Fluid templates
    fluid_expression: $ => seq(
      "{",
      field("content", repeat1(choice(
        $.string,
        $.identifier,
        $.number,
        $.operator,
        /[^}]/    // fallback for now
      ))),
      "}"
    ),

    // Plain text outside of Fluid expressions
    text: _ => token(repeat1(/[^{}]+/)),

    identifier: _ => /[a-zA-Z_][a-zA-Z0-9_:\\.]*/,

    number: _ => /[0-9]+/,

    string: _ => choice(
      /'[^'\\]*(\\.[^'\\]*)*'/,
      /"[^"\\]*(\\.[^"\\]*)*"/
    ),

    operator: _ => token(choice(
      "==",
      "!=",
      "<=",
      ">=",
      "<",
      ">",
      "&&",
      "||",
      ":",
      ",",
      "."
    )),

    comment: _ => token(seq("#", /.*/))
  }
});
