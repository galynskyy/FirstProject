module.exports = {   
  "extends": [
    "stylelint-config-standard",
  ],
  "rules": {
    "indentation": "tab",
    "number-leading-zero": "never",
    "selector-pseudo-class-no-unknown": [true, {"ignorePseudoClasses": ["increment", "decrement"]}],
    "selector-list-comma-newline-after": "always-multi-line",
  }
}