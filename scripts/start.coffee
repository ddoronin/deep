require('shelljs/global');

echo 'Building...'

# Save current directory
dir = pwd();

changeDir = (path) ->
  cd dir
  cd path

# Build UI
changeDir './ui'
exec 'npm install'
exec 'npm run build', () ->
  echo '--> ui build completed...'

# Build Web
changeDir './web'
exec 'npm install'
exec 'npm run serve', () ->
  echo '--> server is running...'
