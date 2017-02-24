require('shelljs/global');

echo 'Building...'
exec 'npm run serve', () ->
  echo 'server run'

cd './ui'
exec 'npm run build', () ->
  echo 'ui build successfully'
