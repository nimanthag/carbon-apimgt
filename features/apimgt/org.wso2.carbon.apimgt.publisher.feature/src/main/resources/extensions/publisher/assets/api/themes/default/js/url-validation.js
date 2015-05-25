$(document).ready(function(){
    $( "body" ).delegate( "button.check_url_valid", "click", function() {
        var btn = this;
        var url = $(this).parent().prev().find('input:first').val();
        var type = $.parseJSON($("#endpoint_config").val())['endpoint_type']
        $(btn).parent().parent().find('.url_validate_label').remove();
        $(btn).addClass("loadingButton-small");
        $(btn).val("Validating..");

        if (url == '') {
            $(btn).parent().after(' <span class="label label-important url_validate_label"><i class="icon-remove icon-white"></i>Invalid URL</span>');
            var toFade = $(btn).next();
            $(btn).removeClass("loadingButton-small");
            $(btn).val("Test URI");
            var foo = setTimeout(function(){$(toFade).hide()},3000);
            return;
        }
        if (!type) {
            type = "";
        }
       /* jagg.post("/site/blocks/item-add/ajax/add.jag", { action:"isURLValid", type:type,url:url },
                  function (result) {
                      if (!result.error) {
                          if (result.response == "success") {
                              $(btn).parent().after(' <span class="label label-success url_validate_label"><i class="icon-ok icon-white"></i>'+ i18n.t('validationMsgs.valid')+'</span>');

                          } else {
                              $(btn).parent().after(' <span class="label label-important url_validate_label"><i class="icon-remove icon-white"></i>'+ i18n.t('validationMsgs.invalid')+'</span>');
                          }
                          var toFade = $(btn).parent().parent().find('.url_validate_label');
                          var foo = setTimeout(function() {
                                $(toFade).hide();
                          }, 3000);

                      }
                      $(btn).removeClass("loadingButton-small");
                      $(btn).val(i18n.t('validationMsgs.testUri'));
        }, "json");*/

     $.ajax({
        type: "POST",
        url: "../apis/validation",
        dataType:"json",
        data: { action:"isURLValid", type:type ,url:url },
        success: function (response) {
          if (!response.error) {
            if(response.status === "success") {
              $(btn).parent().after(' <span class="label label-success url_validate_label"><i class="icon-ok icon-white"></i>Valid URL</span>');
            } else if(response.status === "error") {
              $(btn).parent().after(' <span class="label label-important url_validate_label"><i class="icon-remove icon-white"></i>Invalid URL</span>');
            }
            var toFade = $(btn).parent().parent().find('.url_validate_label');
            var foo = setTimeout(function() {
              $(toFade).hide();
            }, 3000);
          }
          $(btn).removeClass("loadingButton-small");
          $(btn).val("Test URI");
        }
    })

    });
});