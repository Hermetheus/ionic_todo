@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\@angular\compiler-cli\ngcc\main-ivy-ngcc.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\node_modules\@angular\compiler-cli\ngcc\main-ivy-ngcc.js" %*
)