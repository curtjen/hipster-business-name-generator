var require = patchRequire(require);
var casper = require('casper').create();
var n;

if (casper.cli.has('count')) {
  n = casper.cli.get('count');
}
else {
  n = 1;
}

casper.start('http://www.hipsterbusiness.name/#');

casper.then(function() {
  var link = casper.evaluate(function() {
    var link = document.querySelector('a[onclick="makename()"]');
    return link;
  });

  while(n>0) {
    if (link.innerHTML === 'ANOTHER!') {
      casper.click('a[onclick="makename()"]');
      var compname = casper.getHTML('#compname');
      compname = compname.replace("&amp;", "and");
      casper.echo(compname);
      n--;
    }
    else {
      casper.echo('Nothing to click');
      casper.exit();
    }
  }
});

casper.run();
