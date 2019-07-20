/*global jQuery, document, console, username_changer_vars*/
jQuery(document.body).ready(function ($) {
    'use strict';

    var Username_Changer_Settings, Username_Changer_Profile, profileForm, mount, message, link, currentUsernameInput, newUsernameInput, submitButton, cancelButton, minimumLength;

    /**
     * Settings
     */
    Username_Changer_Settings = {
        init : function () {
            this.general();
        },

        general : function () {

        }
    };
    Username_Changer_Settings.init();


    /**
     * Profile page
     */
    Username_Changer_Profile = {
        init : function () {
            this.general();
        },

        general : function () {
            if((username_changer_vars.current_screen === 'profile' || username_changer_vars.current_screen === 'user-edit') && username_changer_vars.can_change_username === '1') {
                currentUsernameInput = document.getElementById('user_login');
                mount = document.querySelector('.user-user-login-wrap td .description');

                link = this.createElement('a', {
                    id: 'username-changer-link',
                    href: '#',
                    onclick: this.toggle
                }, username_changer_vars.change_button_label );

                newUsernameInput = this.createElement('input', {
                    id: 'username-changer-input',
                    type: 'text',
                    name: 'new_user_login',
                    value: currentUsernameInput.value,
                    className: 'regular-text',
                    style: { 'min-height': '28px' },
                    autocomplete: 'off'
                });

                cancelButton = this.createElement('input', {
                    id: 'username-changer-cancel',
                    type: 'button',
                    value: username_changer_vars.cancel_button_label,
                    className: 'button',
                    style: { 'margin-left': '5px' },
                    onclick: this.toggle
                });

                submitButton = this.createElement('input', {
                    id: 'username-changer-submit',
                    type: 'button',
                    value: username_changer_vars.save_button_label,
                    className: 'button',
                    style: { 'margin-left': '5px' },
                    onclick: this.onSubmit
                });

                profileForm = this.createElement('form', {
                    id: 'username-changer-form',
                    method: 'POST',
                    onsubmit: this.onSubmit,
                    style: { 'display': 'none' }
                }, [
                    newUsernameInput,
                    submitButton,
                    cancelButton
                ]);

                message = this.createElement('p', {
                    id: 'username-changer-message',
                    style: { 'display': 'none' }
                });

                mount.parentNode.replaceChild(link, mount);
                link.parentNode.appendChild(this.createElement('div', [profileForm, message]));

                minimumLength = parseInt(username_changer_vars.minimum_length);

                $('#username-changer-input').on('input', function () {
                    if($(this).val().length < minimumLength) {
                        message.style.color = 'red';
                        message.textContent = username_changer_vars.error_short_username;
                        message.style.display = '';

                        submitButton.disabled = true;
                    } else {
                        if(submitButton.disabled === true) {
                            message.style.display = 'none';
                            message.textContent = '';
                            submitButton.disabled = false;
                            cancelButton.disabled = false;
                        }
                    }
                });
            }
        },

        createElement : function (name, attrs, children) {
            var e = document.createElement(name);

            if(!children && (Array.isArray(attrs) || typeof(attrs) === 'string')) {
                children = attrs;
                attrs = null;
            }

            if(attrs) {
                this.setAttribute(e, attrs);
            }

            if(children) {
                if(typeof(children) === 'string') {
                    e.textContent = children;
                } else {
                    for(var i=0; i<children.length; i++) {
                        e.appendChild(children[i]);
                    }
                }
            }

            return e;
        },

        setAttribute : function(object, attrs) {
            for(var key in attrs) {
                if(typeof(attrs[key]) === 'object') {
                    this.setAttribute(object[key], attrs[key]);
                } else {
                    object[key] = attrs[key];
                }
            }
        },

        toggle : function(e) {
            e.preventDefault();

            if(profileForm.style.display === 'none') {
                profileForm.style.display = '';
                link.style.display = 'none';
                currentUsernameInput.style.display = 'none';
                newUsernameInput.focus();
            } else {
                profileForm.style.display = 'none';
                link.style.display = 'inline';
                currentUsernameInput.style.display = '';
                message.style.display = 'none';
                message.textContent = '';
                newUsernameInput.value = currentUsernameInput.value;
                submitButton.disabled = false;
                cancelButton.disabled = false;
            }
        },

        onSubmit : function(e) {
            e.preventDefault();

            var newUsername, currentUsername, postData, error = true;

            newUsername = profileForm.new_user_login.value;
            currentUsername = currentUsernameInput.value;
            minimumLength = parseInt(username_changer_vars.minimum_length);

            if(newUsername === currentUsername) {
                cancelButton.click();
                return;
            }

            submitButton.value = username_changer_vars.please_wait_message;
            submitButton.disabled = true;
            cancelButton.disabled = true;

            if(newUsername.length < minimumLength) {
                message.style.color = 'red';
                message.textContent = username_changer_vars.error_short_username;
                message.style.display = '';

                submitButton.value = username_changer_vars.save_button_label;
                cancelButton.disabled = false;

                return;
            }

            postData = {
                action: 'change_username',
                old_username: currentUsername,
                new_username: newUsername,
                security: username_changer_vars.nonce
            };

            $.ajax({
                type: 'POST',
                data: postData,
                dataType: 'json',
                url: username_changer_vars.ajaxurl,
                success: function (response) {
                    if(response !== null) {
                        try {
                            username_changer_vars.nonce = response.new_nonce;
                            message.style.color = response.success ? 'green' : 'red';
                            message.innerHTML = response.message;

                            if(response.success) {
                                currentUsernameInput.value = newUsername;
                                error = false;
                            }
                        } catch(e) {
                            message.style.color = 'red';
                            message.textContent = username_changer_vars.error_unknown;
                        }
                    } else {
                        message.style.color = 'red';
                        message.textContent = username_changer_vars.error_unknown;
                    }

                    message.style.display = '';

                    cancelButton.disabled = false;
                    submitButton.value = username_changer_vars.save_button_label;

                    if(error === false) {
                        currentUsernameInput.value = newUsername;

                        if($('input[name="nickname"]').val() === currentUsername) {
                            $('input[name="nickname"]').val(newUsername);
                        }

                        if($('select[name="display_name"] option:selected').text() === currentUsername) {
                            $('select[name="display_name"] option:selected').text(newUsername);
                        }

                        profileForm.style.display = 'none';
                        link.style.display = 'inline';
                        currentUsernameInput.style.display = '';

                        return;
                    }
                }
            }).fail(function (data) {
                if(window.console && window.console.log) {
                    console.log(data);
                }
            });
        }
    };
    Username_Changer_Profile.init();
});
