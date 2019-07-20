(function($) {
    $(function() {

        $('#markdown-switch').click(function() {
            var md_this_post = window.markdown_this_post_config;

            if ($('input[name=markdown_this_post]:checked').length > 0) {
                var markdown_this_post = 'yes';
            } else {
                var markdown_this_post = 'no';
            }

            $.ajax({
                url: md_this_post.ajax_url,
                type: 'post',
                dataType: 'json',
                data: {
                    action: 'githuber_markdown_this_post',
                    post_id: md_this_post.post_id,
                    markdown_this_post: markdown_this_post
                },
                success: function(data) {
                    if (data.success) {
                        location.reload();
                    }
                }
            });
        });
    });
})(jQuery);