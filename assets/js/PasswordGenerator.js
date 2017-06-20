
var PasswordGenerator = {
	
	words: [], 

	init: function () {

		console.log("PasswordGenerator.init");

		var self = this;

		// GET TEXT
		$.get('../cite/assets/text.txt', function(data) {
		
			self.parseText( data );
		
		});

	},

    shuffle: function (a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    },

	parseText: function ( input ) {

		console.log("PasswordGenerator.parseText");

		// REMOVE PUNCTUATION
		input = input.replace(/[.,\/#!$%\^&\*;:{}=\\-_`~()']/g,"");

		// SPLIT INTO WORDS
		var allWords = input.split(/[\s\n]+/),
			selectedWords = [],
			sortedWords = [],
			finalWords = [];

		// REMOVE ALL SHORT WORDS + CHECK IF NOT ALREADY IN ARRAY
		_.each( allWords, function(word, i ){
			if ( word.length > 4 && word.length < 12 && selectedWords.indexOf( word ) === -1 ) {
				selectedWords.push( word.toLowerCase() );
				
				// CREATE MULTI-DIMENSIONAL ARRAY
				// IF WORD LENGTH ARRAY DOESN'T EXIST
				if ( sortedWords[word.length] === undefined ) {
					sortedWords[word.length] = [];
					sortedWords[word.length].push( word.toLowerCase() );
				} else {
					sortedWords[word.length].push( word.toLowerCase() );
				}

			}
		});

        // SHUFFLE ARRAY
        this.shuffle( selectedWords );

		console.log( 37, selectedWords, sortedWords );

		var maxLength = 16,
			breakLen,
			spaceLeft,
			possibilities, 
			symbols = ["/","#","!","$","%","&","*",";",":","{","}","=","(",")","1","2","3","4","5","6","7","8","9"];

		// LOOP THROUGH WORDS
		_.each( selectedWords, function( word, i ) {

			var passwordString = "";
			passwordString += word;
			breakLen = Math.floor( (Math.random() * 2) + 2 ),
			self = this;
			
			PasswordGenerator.shuffle( symbols );
			// ADD BREAK SYMBOLS
			for ( var j=0; j <= breakLen; j++ ) {
				passwordString += symbols[j];
			}

			// GET REMAINING WORD  FROM SORTED WORDS ARRAY
			spaceLeft = maxLength - passwordString.length;

			// IF ENOUGH SPACE
			if ( sortedWords[ spaceLeft ] !== undefined ) {
				possibilities = sortedWords[ spaceLeft ].length;
				passwordString += sortedWords[ spaceLeft ][ Math.floor( Math.random() * possibilities ) ];
				finalWords.push( passwordString );
			}

		});

		// STORE IN OBJECT
		console.log( 99, finalWords );
		this.words = finalWords;

		// SUBTLE INIT
		SubtleText.init( $("#subtle_text_wrapper"), 15000, 3000, 120 );   

	}

}