module.exports = {
    "env": {
        "browser": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 5,
        "ecmaVersion": 6
    },
	"globals": {
		"moment": true,
        "$": true,
		"activeTasksModule": true
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
	    "no-multiple-empty-lines": [
		    "error",
		    {
			    "max": 1,
			    "maxEOF": 1
		    }
	    ],
	    "comma-spacing": [
		    "error",
		    {
			    "after": true
		    }
	    ],
	    "newline-after-var": "error",
	    "newline-before-return": "error",
	    "no-multiple-empty-lines": [
		    "error",
		    {
			    "max": 1,
			    "maxEOF": 1
		    }
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