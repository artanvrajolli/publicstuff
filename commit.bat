@echo off

REM Run npm build
call npm run build

REM Replace {{script}} with 'https://example.com' in README.MD
set "replacement=https://artanvrajolli.github.io/publicstuff/assets/index.js"
set "file=README.MD"
call powershell -Command "(gc README-TEMPLATE.MD) -replace '{{script}}', '%replacement%' | Out-File -encoding ASCII '%file%'"

REM Add all files to the git repository
call git add .

REM Commit the changes
call git commit -m "committed triggered via commit.bat file"

REM Push the changes to the remote repository
call git push -uf origin main
