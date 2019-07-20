// Crayon Syntax Highlighter Admin JavaScript

(function ($) {

    window.CrayonSyntaxAdmin = new function () {
        var base = this;

        // Preview
        var preview, previewWrapper, previewInner, preview_info, preview_cbox, preview_delay_timer, preview_get, preview_loaded;
        // The DOM object ids that trigger a preview update
        var preview_obj_names = [];
        // The jQuery objects for these objects
        var preview_objs = [];
        var preview_last_values = [];
        // Alignment
        var align_drop, float;
        // Toolbar
        var overlay, toolbar;
        // Error
        var msg_cbox, msg;
        // Log
        var log_button, log_text, log_wrapper, change_button, change_code, plain, copy, clog, help;

        var main_wrap, theme_editor_wrap, theme_editor_loading, theme_editor_edit_button, theme_editor_create_button, theme_editor_duplicate_button, theme_editor_delete_button, theme_editor_submit_button;
        var theme_select, theme_info, theme_ver, theme_author, theme_desc;

        var settings = null;
        var strings = null;
        var adminSettings = null;
        var util = null;

        base.init = function () {
            CrayonUtil.log('admin init');
            settings = CrayonSyntaxSettings;
            adminSettings = CrayonAdminSettings;
            strings = CrayonAdminStrings;
            util = CrayonUtil;

            // Dialogs
            var dialogFunction = adminSettings.dialogFunction;
            dialogFunction = $.fn[dialogFunction] ? dialogFunction : 'dialog';
            $.fn.crayonDialog = $.fn[dialogFunction];

            // Wraps
            main_wrap = $('#crayon-main-wrap');
            theme_editor_wrap = $('#crayon-theme-editor-wrap');

            // Themes
            theme_select = $('#crayon-theme');
            theme_info = $('#crayon-theme-info');
            theme_ver = theme_info.find('.version').next('div');
            theme_author = theme_info.find('.author').next('div');
            theme_desc = theme_info.find('.desc');
            base.show_theme_info();
            theme_select.change(function () {
                base.show_theme_info();
                base.preview_update();
            });

            theme_editor_edit_button = $('#crayon-theme-editor-edit-button');
            theme_editor_create_button = $('#crayon-theme-editor-create-button');
            theme_editor_duplicate_button = $('#crayon-theme-editor-duplicate-button');
            theme_editor_delete_button = $('#crayon-theme-editor-delete-button');
            theme_editor_submit_button = $('#crayon-theme-editor-submit-button');
            theme_editor_edit_button.click(function () {
                base.show_theme_editor(theme_editor_edit_button,
                    true);
            });
            theme_editor_create_button.click(function () {
                base.show_theme_editor(theme_editor_create_button,
                    false);
            });
            theme_editor_duplicate_button.click(function () {
                CrayonSyntaxThemeEditor.duplicate(adminSettings.currTheme, adminSettings.currThemeName);
            });
            theme_editor_delete_button.click(function () {
                if (!theme_editor_edit_button.attr('disabled')) {
                    CrayonSyntaxThemeEditor.del(adminSettings.currTheme, adminSettings.currThemeName);
                }
                return false;
            });
            theme_editor_submit_button.click(function () {
                CrayonSyntaxThemeEditor.submit(adminSettings.currTheme, adminSettings.currThemeName);
            });

            // Help
            help = $('.crayon-help-close');
            help.click(function () {
                $('.crayon-help').hide();
                CrayonUtil.getAJAX({
                    action: 'crayon-ajax',
                    'hide-help': 1
                });
            });

            // Preview
            preview = $('#crayon-live-preview');
            previewWrapper = $('#crayon-live-preview-wrapper');
            previewInner = $('#crayon-live-preview-inner');
            preview_info = $('#crayon-preview-info');
            preview_cbox = util.cssElem('#preview');
            if (preview.length != 0) {
                // Preview not needed in Tag Editor
                preview_register();
                preview.ready(function () {
                    preview_toggle();
                });
                preview_cbox.change(function () {
                    preview_toggle();
                });
            }

            $('#show-posts').click(function () {
                CrayonUtil.getAJAX({
                    action: 'crayon-show-posts'
                }, function (data) {
                    $('#crayon-subsection-posts-info').html(data);
                });
            });

            $('#show-langs').click(function () {
                CrayonUtil.getAJAX({
                    action: 'crayon-show-langs'
                }, function (data) {
                    $('#lang-info').hide();
                    $('#crayon-subsection-langs-info').html(data);
                });
            });

            // Convert
            $('#crayon-settings-form input').live(
                'focusin focusout mouseup',
                function () {
                    $('#crayon-settings-form').data('lastSelected', $(this));
                });
            $('#crayon-settings-form')
                .submit(
                function () {
                    var last = $(this).data('lastSelected').get(0);
                    var target = $('#convert').get(0);
                    if (last == target) {
                        var r = confirm("Please BACKUP your database first! Converting will update your post content. Do you wish to continue?");
                        return r;
                    }
                });

            // Alignment
            align_drop = util.cssElem('#h-align');
            float = $('#crayon-subsection-float');
            align_drop.change(function () {
                float_toggle();
            });
            align_drop.ready(function () {
                float_toggle();
            });

            // Custom Error
            msg_cbox = util.cssElem('#error-msg-show');
            msg = util.cssElem('#error-msg');
            toggle_error();
            msg_cbox.change(function () {
                toggle_error();
            });

            // Toolbar
            overlay = $('#crayon-subsection-toolbar');
            toolbar = util.cssElem('#toolbar');
            toggle_toolbar();
            toolbar.change(function () {
                toggle_toolbar();
            });

            // Copy
            plain = util.cssElem('#plain');
            copy = $('#crayon-subsection-copy-check');
            plain.change(function () {
                if (plain.is(':checked')) {
                    copy.show();
                } else {
                    copy.hide();
                }
            });

            // Log
            log_wrapper = $('#crayon-log-wrapper');
            log_button = $('#crayon-log-toggle');
            log_text = $('#crayon-log-text');
            var show_log = log_button.attr('show_txt');
            var hide_log = log_button.attr('hide_txt');
            clog = $('#crayon-log');
            log_button.val(show_log);
            log_button.click(function () {
                clog.width(log_wrapper.width());
                clog.toggle();
                // Scrolls content
                clog.scrollTop(log_text.height());
                var text = (log_button.val() == show_log ? hide_log
                    : show_log);
                log_button.val(text);
            });

            change_button = $('#crayon-change-code');
            change_button.click(function () {
                base.createDialog({
                    title: strings.changeCode,
                    html: '<textarea id="crayon-change-code-text"></textarea>',
                    desc: null,
                    value: '',
                    options: {
                        buttons: {
                            "OK": function () {
                                change_code = $('#crayon-change-code-text').val();
                                base.preview_update();
                                $(this).crayonDialog('close');
                            },
                            "Cancel": function () {
                                $(this).crayonDialog('close');
                            }
                        },
                        open: function () {
                            if (change_code) {
                                $('#crayon-change-code-text').val(change_code);
                            }
                        }
                    }
                });
                return false;
            });
            $('#crayon-fallback-lang').change(function () {
                change_code = null;
                base.preview_update();
            });
        };

        /* Whenever a control changes preview */
        base.preview_update = function (vars) {
            var val = 0;
            var obj;
            var getVars = $.extend({
                action: 'crayon-show-preview',
                theme: adminSettings.currTheme
            }, vars);
            if (change_code) {
                getVars[adminSettings.sampleCode] = change_code;
            }
            for (var i = 0; i < preview_obj_names.length; i++) {
                obj = preview_objs[i];
                if (obj.attr('type') == 'checkbox') {
                    val = obj.is(':checked');
                } else {
                    val = obj.val();
                }
                getVars[preview_obj_names[i]] = val;//CrayonUtil.escape(val);
            }

            // Load Preview
            CrayonUtil.postAJAX(getVars, function (data) {
                preview.html(data);
                // Important! Calls the crayon.js init
                CrayonSyntax.init();
                base.preview_ready();
            });
        };

        base.preview_ready = function () {
            if (!preview_loaded) {
                preview_loaded = true;
                if (window.GET['theme-editor']) {
                    CrayonSyntaxAdmin.show_theme_editor(
                        theme_editor_edit_button, true);
                }
            }
        };

        var preview_toggle = function () {
            // CrayonUtil.log('preview_toggle');
            if (preview_cbox.is(':checked')) {
                preview.show();
                preview_info.show();
                base.preview_update();
            } else {
                preview.hide();
                preview_info.hide();
            }
        };

        var float_toggle = function () {
            if (align_drop.val() != 0) {
                float.show();
            } else {
                float.hide();
            }
        };

        // List of callbacks
        var preview_callback;
        var preview_txt_change;
        var preview_txt_callback; // Only updates if text value changed
        var preview_txt_callback_delayed;
        // var height_set;

        // Register all event handlers for preview objects
        var preview_register = function () {
            // Instant callback
            preview_callback = function () {
                base.preview_update();
            };

            // Checks if the text input is changed, if so, runs the callback
            // with given event
            preview_txt_change = function (callback, event) {
                // CrayonUtil.log('checking if changed');
                var obj = event.target;
                var last = preview_last_values[obj.id];
                // CrayonUtil.log('last' + preview_last_values[obj.id]);

                if (obj.value != last) {
                    // CrayonUtil.log('changed');
                    // Update last value to current
                    preview_last_values[obj.id] = obj.value;
                    // Run callback with event
                    callback(event);
                }
            };

            // Only updates when text is changed
            preview_txt_callback = function (event) {
                // CrayonUtil.log('txt callback');
                preview_txt_change(base.preview_update, event);
            };

            // Only updates when text is changed, but callback
            preview_txt_callback_delayed = function (event) {
                preview_txt_change(function () {
                    clearInterval(preview_delay_timer);
                    preview_delay_timer = setInterval(function () {
                        // CrayonUtil.log('delayed update');
                        base.preview_update();
                        clearInterval(preview_delay_timer);
                    }, 500);
                }, event);
            };

            // Retreive preview objects
            $('[crayon-preview="1"]').each(function (i) {
                var obj = $(this);
                var id = obj.attr('id');
                // XXX Remove prefix
                id = util.removePrefixFromID(id);
                preview_obj_names[i] = id;
                preview_objs[i] = obj;
                // To capture key up events when typing
                if (obj.attr('type') == 'text') {
                    preview_last_values[obj.attr('id')] = obj.val();
                    obj.bind('keyup', preview_txt_callback_delayed);
                    obj.change(preview_txt_callback);
                } else {
                    // For all other objects
                    obj.change(preview_callback);
                }
            });
        };

        var toggle_error = function () {
            if (msg_cbox.is(':checked')) {
                msg.show();
            } else {
                msg.hide();
            }
        };

        var toggle_toolbar = function () {
            if (toolbar.val() == 0) {
                overlay.show();
            } else {
                overlay.hide();
            }
        };

        base.get_vars = function () {
            var vars = {};
            window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                vars[key] = value;
            });
            return vars;
        };

        // Changing wrap views
        base.show_main = function () {
            theme_editor_wrap.hide();
            main_wrap.show();
            return false;
        };


        base.refresh_theme_info = function (callback) {
            adminSettings.currTheme = theme_select.val();
            adminSettings.currThemeName = theme_select.find('option:selected').attr('data-value');
            adminSettings.currThemeIsUser = adminSettings.currTheme in adminSettings.userThemes;
            var url = adminSettings.currThemeIsUser ? adminSettings.userThemesURL : adminSettings.themesURL;
            adminSettings.currThemeURL = base.get_theme_url(adminSettings.currTheme);
            // Load the theme file

            $.ajax({
                url: adminSettings.currThemeURL,
                success: function (data) {
                    adminSettings.currThemeCSS = data;
//                    var fields = {
//                        'Version': theme_ver,
//                        'Author': theme_author,
//                        'URL': null,
//                        'Description': theme_desc
//                    };
//                    for (field in fields) {
//                        var re = new RegExp('(?:^|[\\r\\n]\\s*)\\b' + field
//                            + '\\s*:\\s*([^\\r\\n]+)', 'gmi');
//                        var match = re.exec(data);
//                        var val = fields[field];
//                        if (match) {
//                            if (val != null) {
//                                val.html(match[1].escape().linkify('_blank'));
//                            } else if (field == 'Author URI') {
//                                theme_author.html('<a href="' + match[1]
//                                    + '" target="_blank">'
//                                    + theme_author.text() + '</a>');
//                            }
//                        } else if (val != null) {
//                            val.text('N/A');
//                        }
//                    }
                    if (callback) {
                        callback();
                    }
                },
                cache: false
            });

            adminSettings.currThemeCSS = '';
        };

        base.get_theme_url = function ($id) {
            var url = $id in adminSettings.userThemes ? adminSettings.userThemesURL : adminSettings.themesURL;
            return url + $id + '/' + $id + '.css';
        };

        base.show_theme_info = function (callback) {
            base.refresh_theme_info(function () {
                var info = CrayonSyntaxThemeEditor.readCSSInfo(adminSettings.currThemeCSS);
                var infoHTML = '';
                for (id in info) {
                    if (id != 'name') {
                        infoHTML += '<div class="fieldset">';
                        if (id != 'description') {
                            infoHTML += '<div class="' + id + ' field">' + CrayonSyntaxThemeEditor.getFieldName(id) + ':</div>';
                        }
                        infoHTML += '<div class="' + id + ' value">' + info[id].linkify('_blank') + '</div></div>';
                    }
                }
                var type, typeName;
                if (adminSettings.currThemeIsUser) {
                    type = 'user';
                    typeName = CrayonThemeEditorStrings.userTheme;
                } else {
                    type = 'stock';
                    typeName = CrayonThemeEditorStrings.stockTheme;
                }
                infoHTML = '<div class="type ' + type + '">' + typeName + '</div><div class="content">' + infoHTML + '</div>';
                theme_info.html(infoHTML);
                // Disable for stock themes
                var disabled = !adminSettings.currThemeIsUser && !settings.debug;
                theme_editor_edit_button.attr('disabled', disabled);
                theme_editor_delete_button.attr('disabled', disabled);
                theme_editor_submit_button.attr('disabled', disabled);
                if (callback) {
                    callback();
                }
            });
        };

        base.show_theme_editor = function (button, editing) {
            if (theme_editor_edit_button.attr('disabled')) {
                return false;
            }
            base.refresh_theme_info();
            button.html(button.attr('loading'));
            adminSettings.editing_theme = editing;
            theme_editor_loading = true;
            // Load theme editor
            CrayonUtil.getAJAX({
                action: 'crayon-theme-editor',
                currTheme: adminSettings.currTheme,
                editing: editing
            }, function (data) {
                theme_editor_wrap.html(data);
                // Load preview into editor
                if (theme_editor_loading) {
                    CrayonSyntaxThemeEditor.init();
                }
                CrayonSyntaxThemeEditor.show(function () {
                    base.show_theme_editor_now(button);
                }, previewInner);
            });
            return false;
        };

        base.resetPreview = function () {
            previewWrapper.append(previewInner);
            CrayonSyntaxThemeEditor.removeStyle();
        };

        base.show_theme_editor_now = function (button) {
            main_wrap.hide();
            theme_editor_wrap.show();
            theme_editor_loading = false;
            button.html(button.attr('loaded'));
        };

        // JQUERY UI DIALOGS

        base.createAlert = function (args) {
            args = $.extend({
                title: strings.alert,
                options: {
                    buttons: {
                        "OK": function () {
                            $(this).crayonDialog('close');
                        }
                    }
                }
            }, args);
            base.createDialog(args);
        };

        base.createDialog = function (args, options) {
            var defaultArgs = {
                yesLabel: strings.yes,
                noLabel: strings.no,
                title: strings.confirm
            };
            args = $.extend(defaultArgs, args);
            var options = $.extend({
                modal: true, title: args.title, zIndex: 10000, autoOpen: true,
                width: 'auto', resizable: false,
                buttons: {
                },
                dialogClass: 'wp-dialog',
                selectedButtonIndex: 1, // starts from 1
                close: function (event, ui) {
                    $(this).remove();
                }
            }, options);
            options.buttons[args.yesLabel] = function () {
                if (args.yes) {
                    args.yes();
                }
                $(this).crayonDialog('close');
            };
            options.buttons[args.noLabel] = function () {
                if (args.no) {
                    args.no();
                }
                $(this).crayonDialog('close');
            };
            options = $.extend(options, args.options);
            options.open = function () {
                $('.ui-button').addClass('button-primary');
                $(this).parent().find('button:nth-child(' + options.selectedButtonIndex + ')').focus();
                if (args.options.open) {
                    args.options.open();
                }
            };
            $('<div></div>').appendTo('body').html(args.html).crayonDialog(options);
            // Can be modified afterwards
            return args;
        };

    };

})(jQueryCrayon);
