Template.codepad.helpers({
        config: function () {
                return function (editor) {
                        editor.setTheme('ace/theme/monokai');
                        editor.getSession().setMode('ace/mode/javascript');
                        editor.setShowPrintMargin(false);
                        editor.getSession().setUseWrapMode(true);
                };
        },
        docid: function () {
                return Session.get('padid');
        }
});
