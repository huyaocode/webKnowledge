jQuery( document ).ready( function () {

	jQuery( '#resetpassform, #your-profile, #createuser' ).submit( function () {

		jQuery( '#submit, #createusersub' ).append( '<input type="hidden" name="password_strength" id="password_strength" value="' + jQuery( '#pass-strength-result' ).attr( 'class' ) + '">' );

	} );

} );
