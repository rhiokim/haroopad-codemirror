(function() {
  'use strict';

  var listRE = /^(\s*)([*+-]|(\d+)\.)(\s*)/,
      unorderedBullets = '*+-';

  CodeMirror.commands.newlineAndIndentContinueMarkdownList = function(cm) {
    if (cm.getOption("disableInput")) return CodeMirror.Pass;

    var pos = cm.getCursor(),
        inList = cm.getStateAfter(pos.line).list !== false,
        match;

    if (!inList || !(match = cm.getLine(pos.line).match(listRE))) {
      cm.execCommand('newlineAndIndent');
      return;
    }

    if (!match.input.replace(match[0], '').trim()) {
      cm.removeLine(pos.line);
      cm.replaceSelection('\n', 'end');
      // cm.setLine(pos.line+1, '');
      // cm.execCommand('newlineAndIndent');
      return;
    }

    var indent = match[1], after = match[4];
    var bullet = unorderedBullets.indexOf(match[2]) >= 0
      ? match[2]
      : (parseInt(match[3], 10) + 1) + '.';

    cm.replaceSelection('\n' + indent + bullet + after, 'end');
  };

}());
