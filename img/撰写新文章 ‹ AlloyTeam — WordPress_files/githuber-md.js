

var global_editormd_config = {};
var wp_editor_container = '#wp-content-editor-container';
var wp_editor = 'wp-content-editor-container';
var githuber_md_editor;
var is_support_inline_keyboard_style = false;
var is_support_html_figure = false;
var spellcheck_dictionary_dir = '';
var spellcheck_lang = 'en_US';

(function($) {
    $(function() {
        var config = window.editormd_config;

        spellcheck_lang = config.editor_spell_check_lang;
        spellcheck_dictionary_dir = 'https://spellcheck-dictionaries.github.io/' + spellcheck_lang + '/';

        is_support_inline_keyboard_style = (config.support_inline_code_keyboard_style == 'yes');
        is_support_html_figure = (config.support_html_figure == 'yes');

        global_editormd_config = {
            width: '100%',
            height: 640,
            path: config.editor_modules_url,
            placeholder: config.placeholder,
            syncScrolling: (config.editor_sync_scrolling == 'yes'),
            watch: (config.editor_live_preview == 'yes'),        
            htmlDecode: (config.editor_html_decode == 'yes'),
            theme: config.editor_toolbar_theme, 
            previewTheme: 'default',
            editorTheme: config.editor_editor_theme, 
            tocContainer: (config.support_toc == 'yes') ? '' : false,
            emoji: (config.support_emoji == 'yes'),   
            tex: (config.support_katex == 'yes'),
            flowChart: (config.support_flowchart == 'yes'),  
            sequenceDiagram: (config.support_sequence_diagram == 'yes'), 
            taskList: (config.support_task_list == 'yes'),
            mermaid: (config.support_mermaid == 'yes'),
            lineNumbers: (config.editor_line_number == 'yes'),
            previewCodeLineNumber: (config.prism_line_number == 'yes'),
            spellCheck: (config.editor_spell_check == 'yes'),
            matchWordHighlight: (config.editor_match_highlighter == 'yes') ? 'onselected' : false,
            toolbarAutoFixed: true,
            tocm: false, 
            tocDropdown: false,    
            atLink: false,
            imagePasteCallback: config.image_paste_callback,
            toolbarIcons: function () {
                return [
                    'undo', 'redo', '|',
                    'bold', 'del', 'italic', 'quote', '|',
                    'h1', 'h2', 'h3', 'h4', '|',
                    'list-ul', 'list-ol', 'hr', '|',
                    'link', 'reference-link', 'image', 'code', 'code-block', 'table', 'datetime', 'html-entities', 'more', 'pagebreak', config.support_emoji == 'yes' ? 'emoji' : '' + '|',
                    'watch', 'preview', 'fullscreen', 'help'
                ];
            },
            onfullscreen: function () {
                $(wp_editor_container).css({
                    'position': 'fixed',
                    'z-index': '99999'
                })
            },

            onfullscreenExit: function () {
                $(wp_editor_container).css({
                    'position': 'relative',
                    'z-index': 'auto'
                });
                reload_githuber_md();
            },

            toolbarIconsClass: {
                toc: 'fa-list-alt',
                more: 'fa-ellipsis-h'
            },

            toolbarHandlers: {
                toc: function (cm, icon, cursor, selection) {
                    cm.replaceSelection('[toc]');
                },
                more: function (cm, icon, cursor, selection) {
                    cm.replaceSelection('\r\n<!--more-->\r\n');
                }
            },
            lang: {
                toolbar: {
                    toc: 'The Table Of Contents',
                    more: 'More'
                }
            },
        };


        if ($(wp_editor_container).length == 1) {
            githuber_md_editor = editormd(wp_editor, global_editormd_config);
        }

        function reload_githuber_md() {
            //  githuber_md_editor = editormd(wp_editor, global_editormd_config);
        }

        if (typeof image_insert_type !== 'undefined') {
            var image_insert_type = 'markdown';
        }
        $(document).on('change', '.githuber_image_insert', function() {
            // html or markdown
            image_insert_type = $(this).val();
        });

        /*
            $(document).ajaxSuccess(function(event, xhr, settings, data) {
                if (settings.url.indexOf('/wp-admin/admin-ajax.php') !== -1 && typeof data.data !== 'undefined') {
                    if (data.success && typeof data.data === 'string') {

                    }
                }
            });
        */

        wp.media.editor.insert = function (html_str) {
            //console.log(html_str);
            var new_content = '';

            if (html_str.substring(0, 4) == '<img') {
    
                var img_src = $(html_str).attr('src');
                var img_alt = $(html_str).attr('alt');

                if (image_insert_type === 'html') {
                    new_content += html_str;
                } else {
                    new_content += '![' + img_alt + '](' + img_src + ')';
                }

                githuber_md_editor.replaceSelection(new_content);
                image_insert_type = 'markdown';

            } else if (html_str.substring(0, 7) == '<a href' && -1 !== html_str.indexOf('<img')) {

                var a_href = $(html_str).attr('href');
                var img_src = $(html_str).find('img').attr('src');
                var img_alt = $(html_str).find('img').attr('alt');

                if (image_insert_type === 'html') {
                    new_content += html_str;
                } else {
                    new_content += '[![' + img_alt + '](' + img_src + ')](' + a_href + ')';
                }

                githuber_md_editor.replaceSelection(new_content);
                image_insert_type = 'markdown';
        
            } else if (html_str.substring(0, 1) == '[' && html_str.slice(-1) == ']') {

                new_content += html_str;
                githuber_md_editor.replaceSelection(new_content);
            }
        }
    });
})(jQuery);


