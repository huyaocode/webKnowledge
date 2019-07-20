function wptouchSetupAjax() {
	jQuery.ajaxSetup ({
	    cache: false
	});
}

var wptouchTotalAjaxEnabled = 0;

function wptouchAdminAjaxEnableSpinner( enable ) {
	if ( enable ) {
		jQuery( '#admin-spinner' ).animate({
			opacity: 1
		}, 500);
		wptouchTotalAjaxEnabled = wptouchTotalAjaxEnabled + 1;
	} else {
		wptouchTotalAjaxEnabled = wptouchTotalAjaxEnabled - 1;
	}

	if ( wptouchTotalAjaxEnabled == 0 ) {
		jQuery( '#admin-spinner' ).animate({
			opacity: 0
		}, 500);
	}
}

function wptouchAdminAjax( actionName, actionParams, callback ) {
	var ajaxData = {
		action: 'wptouch_ajax',
		wptouch_action: actionName,
		wptouch_ajax_nonce: WPtouchAjax.admin_ajax_nonce
	};

	for ( name in actionParams ) { ajaxData[name] = actionParams[name]; }

	wptouchAdminAjaxEnableSpinner( true );

	jQuery.post( ajaxurl, ajaxData, function( result ) {
		wptouchAdminAjaxEnableSpinner( false );

		if ( typeof( callback ) !== 'undefined' ) {
			callback( result );
		};
	});
}

function wptouchAdminAjaxInstall( target, fileType, fileName, callback, errorCallback ) {
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

	function doErrorCallback(e) {
		if ( typeof( errorCallback ) !== 'undefined' ) {
			errorCallback( target );
		}
	}

	jQuery( target ).text( WPtouchCustom.installing );

	var xhr = new XMLHttpRequest();
	xhr.open('GET', fileName, true);
	xhr.responseType = 'blob';

	xhr.onerror = function( e ) {
		doErrorCallback( e );
	}

	xhr.onload = function(e) {
		var blob = new Blob([xhr.response], {type: 'application/zip'});

		var data = new FormData();
		data.append( 'action', 'upload_file' );
		data.append( 'file_type', fileType );
		data.append( 'wp_nonce', WPtouchCustom.admin_nonce );
		data.append( fileType + '-upload', blob );

		newXhr = new XMLHttpRequest();
		newXhr.open( 'POST', ajaxurl );

		newXhr.onerror = function( e ) {
			doErrorCallback( e );
		}

		newXhr.onload = function( e ) {
			if ( typeof( callback ) !== 'undefined' ) {
				callback( target );
			} else {
				jQuery( target ).replaceWith( '<span class="installed">' + WPtouchCustom.installed + '</span>' );
			}
		}

		newXhr.send( data );
	};

	xhr.send();
}

jQuery( document ).ready( function() { wptouchSetupAjax(); } );