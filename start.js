require('shelljs/global');

echo('This is Shelljs');

cd('ui');
exec('npm run build', (code, output) => echo(output));
