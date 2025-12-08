/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "typo3_fluid",

  extras: $ => [/\s+/, $.comment],

  rules: {
    // INJECTION-ONLY: Only parse Fluid expressions, no surrounding text
    // HTML parser will handle text content and inject Fluid expressions
    source_file: $ => repeat1($.fluid_expression),

    // { ... } expressions used in Fluid templates
    fluid_expression: $ => seq(
      "{",
      field("content", repeat1(choice(
        $.string,
        $.identifier,
        $.number,
        $.operator,
        /[^}]/    // fallback for any other content
      ))),
      "}"
    ),

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
