; Fluid expression delimiters are treated as punctuation
(fluid_expression
  "{" @punctuation.bracket
  "}" @punctuation.bracket)

(identifier) @identifier

(string) @string

(number) @number

(operator) @operator

(comment) @comment

