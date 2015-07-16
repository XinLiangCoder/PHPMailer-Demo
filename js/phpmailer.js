/**
 * 发送邮件验证
 * @author lxl
 */
var PHPMailer={
    /**
     * 验证必要字段
     * @return bool
     */
    'checkEmpty' : function() {
        var source_email   = $("#source_email").val();
        var email_pwd      = $("#email_pwd").val();
        var email_to       = $("#email_to").val();
        var agreement_url  = $("#agreement_url").val();
        var agreement_port = $("#agreement_port").val();

        if (!source_email) {
            $("#source_email").popover('show');
            return false;
        } else {
            $("#source_email").popover('hide');
        }

        if (!email_pwd) {
            $("#email_pwd").popover('show');
            return false;
        } else {
            $("#email_pwd").popover('hide');
        }

        if (!email_to) {
            $("#email_to").popover('show');
            return false;
        } else {
            $("#email_to").popover('hide');
        }

        if (!agreement_url) {
            $("#agreement_url").popover('show');
            return false;
        } else {
            $("#agreement_url").popover('hide');
        }

        if (!agreement_port) {
            $("#agreement_port").popover('show');
            return false;
        } else {
            $("#agreement_port").popover('hide');
        }
        return true;
    },
    /**
     * 发送邮件
     */
    'sendEmail' : function() {
        $.ajax(
            {
                type: "POST",
                url : "mail.php",
                data: {
                    'source_email'   : $("#source_email").val(),
                    'email_pwd'      : $("#email_pwd").val(),
                    'source_name'    : $("#source_name").val(),
                    'reply_email'    : $("#reply_email").val(),
                    'reply_name'     : $("#reply_name").val(),
                    'email_to'       : $("#email_to").val(),
                    'agreement_url'  : $("#agreement_url").val(),
                    'agreement_port' : $("#agreement_port").val()
                },
                asynic: false,
                dataType: "json",
                beforeSend: function () {
                    /** 邮件发送中 **/
                    $("#send_email").css('display','none');
                    $("#loading").show();
                },
                success: function (result) {
                    $("#send_email").show();
                    $("#loading").hide();
                    if (result.code==='ok') {
                        /** 发送成功 **/
                        $(".alert-success").show();
                        $(".alert-danger").hide();
                    } else {
                        /** 发送失败 **/
                        $(".alert-success").hide();
                        $(".alert-danger").show();
                    }
                }
            });
    }
};
$(function(){
    $("#send_email").click(function(){
        /** 验证 **/
        if (PHPMailer.checkEmpty()) {
            /** 发送邮件 **/
            PHPMailer.sendEmail();
        }
    });
});
