module.exports = {
    "env": {
        "browser": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 5,
        "ecmaVersion": 6
    },
    "rules": {
	    "indent": [
	        4, "tab", {"SwitchCase": 1}
        ],
        "no-console": 0,
	    "linebreak-style": 0,
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};