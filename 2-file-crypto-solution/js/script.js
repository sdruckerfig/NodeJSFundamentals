(function($){

	$(document).ready(function(){

		// hold encrypted data as JSON
		var encryptedFile;

		$("#fileName").focus();

		$("#getFileButton").on("click", function(event){
			event.preventDefault();
			// enable decryption in case previously disabled due to File not found
			$("#decryptButton").prop("disabled", false);

			// clear the display field
			$("#encryptedTextDisplay").val("");

			// pass user provided file name to server to encrypt
			// that file and return the encrypted result
			$.ajax({
				url: "/getEncryptedFile",
				method: "get",
				data: {"fileName": $("#fileName").val()},
				success: function(file) {
					$("#passwordField").focus();

					// hold the encrypted file globally for decryption
					encryptedFile = file;

					// SJCL.encrypt() returns a JSON object containing the cipher text and other data
					// parse the object to display the cipher text (ct) to the user
					var encryptedText = JSON.parse(file).ct;
					$("#encryptedTextDisplay").val(encryptedText);

					// disable decryption if requested file not found
					if (encryptedText == "File not found") {
						$("#decryptButton").prop("disabled", true);
					}
				}
			});

		});
		
		$("#decryptButton").on("click", function(event){
			event.preventDefault();

			// use SJCL.decrypt() here on client with a user provided password, to decrypt 
			// and display the user requested file
			var password = $("#passwordField").val();
			var decryptedText = sjcl.decrypt(password, encryptedFile);
			$("#decryptedTextDisplay").val(decryptedText);
		});

	});

})(jQuery);