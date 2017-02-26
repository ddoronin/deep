require('shelljs/global');

echo 'Building...'
exec 'npm run serve', () ->
  echo '--> server is runnning'

cd './ui'
exec 'npm install', () ->
  echo '--> npm has been installed'
  exec 'npm run build', () ->
    echo '--> ui build completed'
