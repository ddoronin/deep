require 'shelljs/global'
path = require 'path'

echo 'Building...'

# Build UI
((cwd) ->
  exec 'npm install', cwd: cwd
  exec 'npm run build', cwd: cwd, () ->
    echo '--> ui build completed...'
)(path.resolve './ui')

# Build Web
((cwd) ->
  exec 'npm install', cwd: cwd
  exec 'npm run serve', cwd: cwd, () ->
    echo '--> server is running...'
)(path.resolve './web')
