require('shelljs/global');

echo 'Building...'

cd './ui'
exec 'npm run build', (code, output) ->
  echo 'exit code #{code}'
  echo output

cd '../'
echo 'npm run serve'
exec 'npm run serve', (code, output) ->
  echo 'exit code #{code}'
  echo output