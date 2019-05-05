{
  "editor.lineHeight": 20,
  "markdownlint.config": {
    "default": true,
    "MD029": false
  },
  // JavaScript 中使用 HTML emmet
  "emmet.syntaxProfiles": {
    "javascript": "html",
    "coffee": "html",
    "vue": "html",
    "vue-html": "html"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "vue-html": "html",
    "wxml": "html"
  },
  "git.autofetch": true,
  "markdown.preview.lineHeight": 1.2,
  "editor.tabSize": 2,
  // 关闭根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  "files.associations": {
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript"
  },
  "minapp-vscode.disableAutoConfig": true,
  // 不使用分号
  "prettier.semi": false,
  // 使用单引号
  "prettier.singleQuote": true,
  "prettier.trailingComma": "all",
  // emmet tab 设置
  "emmet.triggerExpansionOnTab": true,
  "breadcrumbs.enabled": true,
  "workbench.colorTheme": "One Dark Pro",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "semi": false, // 格式化不加分号
      "singleQuote": true, // 格式化以单引号为主
      "trailingComma": "all"
    }
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "liveServer.settings.donotShowInfoMsg": true
  //  "git-autoconfig.configList": [
  //   {
  //     "user.email": "254784109@qq.com",
  //     "user.name": "icemanZB"
  //   }
  // ],
  //分号和双引号确实不会再自动添加了，但是不会在方法括号之间插入空格，可以再加入这条配置即可
  // "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  // "vetur.format.defaultFormatter.js": "vscode-typescript",
}
// Place your key bindings in this file to override the defaults
[
  {
    "key": "alt+cmd+l",
    "command": "editor.action.formatDocument",
    "when": "editorHasDocumentFormattingProvider && editorHasDocumentFormattingProvider && editorTextFocus && !editorReadonly"
  },
  {
    "key": "shift+alt+f",
    "command": "-editor.action.formatDocument",
    "when": "editorHasDocumentFormattingProvider && editorHasDocumentFormattingProvider && editorTextFocus && !editorReadonly"
  },
  {
    "key": "alt+cmd+l",
    "command": "editor.action.formatDocument.none",
    "when": "editorTextFocus && !editorHasDocumentFormattingProvider && !editorHasDocumentFormattingProvider && !editorReadonly"
  },
  {
    "key": "shift+alt+f",
    "command": "-editor.action.formatDocument.none",
    "when": "editorTextFocus && !editorHasDocumentFormattingProvider && !editorHasDocumentFormattingProvider && !editorReadonly"
  },
  {
    "key": "cmd+r",
    "command": "editor.action.startFindReplaceAction"
  },
  {
    "key": "alt+cmd+f",
    "command": "-editor.action.startFindReplaceAction"
  },
  {
    "key": "shift+cmd+r",
    "command": "workbench.action.replaceInFiles"
  },
  {
    "key": "shift+cmd+h",
    "command": "-workbench.action.replaceInFiles"
  },
  {
    "key": "alt+cmd+/",
    "command": "editor.action.blockComment",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "shift+alt+a",
    "command": "-editor.action.blockComment",
    "when": "editorTextFocus && !editorReadonly"
  }
]
