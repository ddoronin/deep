// Generated by CoffeeScript 1.12.4
(function() {
  require('shelljs/global');

  echo('Building...');

  exec('npm run serve', function() {
    return echo('server run');
  });

  cd('./ui');

  exec('npm run build', function() {
    return echo('ui build successfully');
  });

}).call(this);
