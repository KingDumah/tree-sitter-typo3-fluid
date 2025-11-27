{
  "targets": [
    {
      "target_name": "tree_sitter_typo3_fluid_binding",
      "sources": [
        "src/parser.c"
      ],
      "cflags_c": [
        "-std=c11"
      ],
      "include_dirs": [
        "<!(node -e \"require('node-addon-api').include\")"
      ]
    }
  ]
}

