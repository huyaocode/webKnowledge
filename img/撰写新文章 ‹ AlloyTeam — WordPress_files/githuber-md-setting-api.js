( function( $ ) {
    $( function() {
        $( ".setting-toggle" ).each( function() {
            var toggle_location = $( this ).attr( "data-location" );
            if ( toggle_location ) {
                $( this ).appendTo( $( "#" + toggle_location ) );
            }
        } );

        $( ".setting-toggle" ).each( function() {
            check_toggle( $( this ) );
        } );

        $( ".setting-toggle" ).click( function () {
            check_toggle( $( this ) );
        } );

        function check_toggle( obj ) {
            if ( obj.hasClass( "has-child" ) ) {
                var setting = obj.attr( "data-setting" );
                var target  = obj.attr( "data-target" );
            
                var option_value = $( "input[type=checkbox][name='" + target + "']" ).is( ":checked" );  

                console.log(option_value);

                if ( option_value ) {
                    $( ".setting-has-parent[data-parent=" + setting + "]" ).each( function() {
                            $( this ).closest( "tr" ).fadeIn( 500 );
                    } );
                } else {
                    $( ".setting-has-parent[data-parent=" + setting + "]" ).each( function() {
                            $( this ).closest( "tr" ).hide();
                    } );
                }
            }
        }

        if ( "undefined" !== "PR" ) {
            PR.prettyPrint();
        }
    } );
} )( jQuery );