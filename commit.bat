@echo off

REM Run npm build
call npm run build

REM Replace {{script}} with 'https://example.com' in README.MD
@REM set "replacement=https://artanvrajolli.github.io/publicstuff/assets/index.js?x=%time%"

@echo off
for /f %%x in ('wmic path win32_utctime get /format:list ^| findstr "="') do set %%x
set /a "ticks=(%Year% - 1970) * 31536000 + (%Month% - 1) * 2592000 + (%Day% - 1) * 86400 + %Hour% * 3600 + %Minute% * 60 + %Second%"
set "replacement=https://artanvrajolli.github.io/publicstuff/assets/index.js?x=%ticks%"


set "file=README.MD"
call powershell -Command "(gc README-TEMPLATE.MD) -replace '{{script}}', '%replacement%' | Out-File -encoding ASCII '%file%'"

REM Add all files to the git repository
call git add .

REM Commit the changes
call git commit -m "committed triggered via commit.bat file"

REM Push the changes to the remote repository
call git push -uf origin main
