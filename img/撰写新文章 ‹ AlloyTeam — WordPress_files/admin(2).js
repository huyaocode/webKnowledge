(function() {
  function compressImage(event) {
    var element = jQuery(event.target)
    var container = element.closest('div.tiny-ajax-container')
    element.attr('disabled', 'disabled')
    container.find('span.spinner').removeClass('hidden')
    container.find('span.dashicons').remove()
    jQuery.ajax({
      url: ajaxurl,
      type: 'POST',
      data: {
        _nonce: tinyCompress.nonce,
        action: 'tiny_compress_image_from_library',
        id: element.data('id') || element.attr('data-id')
      },
      success: function(data) {
        container.html(data)
      },
      error: function() {
        element.removeAttr('disabled')
        container.find('span.spinner').addClass('hidden')
      }
    })
  }

  function submitKey(event) {
    event.preventDefault()
    jQuery(event.target).attr({disabled: true}).addClass('loading')

    var action
    var parent = jQuery(event.target).closest('div')

    if (jQuery(event.target).data('tiny-action') == 'update-key') {
      action = 'update'
      var key = parent.find('#tinypng_api_key').val()
    } else if (jQuery(event.target).data('tiny-action') == 'create-key') {
      action = 'create'
      var name = parent.find('#tinypng_api_key_name').val()
      var email = parent.find('#tinypng_api_key_email').val()
    } else {
      return false
    }

    jQuery.ajax({
      url: ajaxurl,
      type: 'POST',
      data: {
        _nonce: tinyCompress.nonce,
        action: 'tiny_settings_' + action + '_api_key',
        key: key,
        name: name,
        email: email,
      },

      success: function(json) {
        var status = JSON.parse(json)
        if (status.ok) {
          var target = jQuery('#tiny-account-status')
          if (target.length) {
            jQuery.get(ajaxurl + '?action=tiny_account_status', function(data) {
              jQuery(event.target).attr({disabled: false}).removeClass('loading')
              target.replaceWith(data)
            })
          }
        } else {
          jQuery(event.target).attr({disabled: false}).removeClass('loading')
          parent.addClass('failure')
          parent.find('p.message').text(status.message).show()
        }
      },

      error: function() {
        jQuery(event.target).attr({disabled: false}).removeClass('loading')
        parent.addClass('failure')
        parent.find('p.message').text('Something went wrong, try again soon').show()
      }
    })

    return false
  }

  function dismissNotice(event) {
    var element = jQuery(event.target)
    var notice = element.closest('.tiny-notice')
    element.attr('disabled', 'disabled')
    jQuery.ajax({
      url: ajaxurl,
      type: 'POST',
      dataType: 'json',
      data: {
        _nonce: tinyCompress.nonce,
        action: 'tiny_dismiss_notice',
        name: notice.data('name') || notice.attr('data-name')
      },
      success: function(data) {
        if (data) {
          notice.remove()
        }
      },
      error: function() {
        element.removeAttr('disabled')
      }
    })
    return false
  }

  function updateResizeSettings() {
    if (propOf('#tinypng_sizes_0', 'checked')) {
      jQuery('.tiny-resize-available').show()
      jQuery('.tiny-resize-unavailable').hide()
    } else {
      jQuery('.tiny-resize-available').hide()
      jQuery('.tiny-resize-unavailable').show()
    }

    var original_enabled = propOf('#tinypng_resize_original_enabled', 'checked')
    jQuery('#tinypng_resize_original_width, #tinypng_resize_original_height').each(function (i, el) {
      el.disabled = !original_enabled
    })
  }

  function updatePreserveSettings() {
    if (propOf('#tinypng_sizes_0', 'checked')) {
      jQuery('.tiny-preserve').show()
    } else {
      jQuery('.tiny-preserve').hide()
      jQuery('#tinypng_preserve_data_creation').attr('checked', false)
      jQuery('#tinypng_preserve_data_copyright').attr('checked', false)
      jQuery('#tinypng_preserve_data_location').attr('checked', false)
    }
  }

  function updateSettings() {
    updateResizeSettings()
    updatePreserveSettings()
  }

  var adminpage = ''
  if (typeof window.adminpage !== 'undefined') {
    adminpage = window.adminpage
  }

  function eventOn(event, eventSelector, callback) {
    if (typeof jQuery.fn.on === 'function') {
      jQuery(document).on(event, eventSelector, callback)
    } else {
      jQuery(eventSelector).live(event, callback)
    }
  }

  function propOf(selector, property) {
    if (typeof jQuery.fn.prop === 'function') {
      /* Added in 1.6. Before jQuery 1.6, the .attr() method sometimes took
         property values into account. */
      return jQuery(selector).prop(property)
    } else {
      return jQuery(selector).attr(property)
    }
  }

  function setPropOf(selector, property, value) {
    if (typeof jQuery.fn.prop === 'function') {
      /* Added in 1.6. Before jQuery 1.6, the .attr() method sometimes took
         property values into account. */
      jQuery(selector).prop(property, value)
    } else {
      jQuery(selector).attr(property, value)
    }
  }

  function changeEnterKeyTarget(selector, button) {
    eventOn('keyup keypress', selector, function(event) {
      var code = event.keyCode || event.which
      if (code == 13) {
        jQuery(button).click()
        return false
      }
    })
  }

  switch (adminpage) {
  case 'upload-php':
    eventOn('click', 'button.tiny-compress', compressImage)

    setPropOf('button.tiny-compress', 'disabled', null)

    jQuery('<option>').val('tiny_bulk_action').text(tinyCompress.L10nBulkAction).appendTo('select[name=action]')
    jQuery('<option>').val('tiny_bulk_action').text(tinyCompress.L10nBulkAction).appendTo('select[name=action2]')
    break
  case 'post-php':
    eventOn('click', 'button.tiny-compress', compressImage)
    break
  case 'options-media-php':
  case 'settings_page_media': // Enhanced Media Library plugin
    changeEnterKeyTarget('div.tiny-account-status create', '[data-tiny-action=create-key]')
    changeEnterKeyTarget('div.tiny-account-status update', '[data-tiny-action=update-key]')

    eventOn('click', '[data-tiny-action=create-key]', submitKey)
    eventOn('click', '[data-tiny-action=update-key]', submitKey)

    var target = jQuery('#tiny-account-status[data-state=pending]')
    if (target.length) {
      jQuery.get(ajaxurl + '?action=tiny_account_status', function(data) {
        target.replaceWith(data)
      })
    }

    eventOn('click', 'input[name*=tinypng_sizes], #tinypng_resize_original_enabled', function() {
      /* Unfortunately, we need some additional information to display
         the correct notice. */
      totalSelectedSizes = jQuery('input[name*=tinypng_sizes]:checked').length
      compressWr2x = propOf('#tinypng_sizes_wr2x', 'checked')
      if (compressWr2x) {
        totalSelectedSizes--;
      }

      var image_count_url = ajaxurl + '?action=tiny_image_sizes_notice&image_sizes_selected=' + totalSelectedSizes
      if (propOf('#tinypng_resize_original_enabled', 'checked') && propOf('#tinypng_sizes_0', 'checked')) {
        image_count_url += '&resize_original=true'
      }
      if (compressWr2x) {
        image_count_url += '&compress_wr2x=true'
      }
      jQuery('#tiny-image-sizes-notice').load(image_count_url)
    })

    jQuery('#tinypng_sizes_0, #tinypng_resize_original_enabled').click(updateSettings)
    updateSettings()

  }

  jQuery('.tiny-notice a.tiny-dismiss').click(dismissNotice)
  jQuery(function() {
    jQuery('.tiny-notice.is-dismissible button').unbind('click').click(dismissNotice)
  })
}).call()
