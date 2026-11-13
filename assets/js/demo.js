(function () {
  var root = document.getElementById('hmsDemo');
  if (!root) return;
  var $ = function (s, c) { return (c || root).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || root).querySelectorAll(s)); };
  var extras = [];
  var extraPool = [['Dressing', 150], ['Injection', 100], ['Brace / Belt', 650]];

  function go(n) {
    $$('.hms-tabs button').forEach(function (b) { b.classList.toggle('on', b.dataset.step === String(n)); });
    $$('.hms-scr').forEach(function (s) { s.classList.toggle('on', s.dataset.scr === String(n)); });
    if (String(n) === '4') renderBill();
  }
  function single(group) {
    $$('button', group).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('button', group).forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
      });
    });
  }
  function fee() { return +$('#hmsCase .on').dataset.fee; }
  function renderBill() {
    var rows = [[$('#hmsCase .on').textContent.split(' · ')[0] + ' consultation', fee()]];
    $$('#hmsTests .on').forEach(function (b) { rows.push([b.dataset.name, +b.dataset.fee]); });
    extras.forEach(function (e) { rows.push(e); });
    var total = rows.reduce(function (a, r) { return a + r[1]; }, 0);
    $('#hmsBill').innerHTML = rows.map(function (r) {
      return '<div><span>' + r[0] + '</span><span>₹' + r[1] + '</span></div>';
    }).join('') + '<div><span>Total</span><span>₹' + total + '</span></div>';
  }

  $$('.hms-tabs button').forEach(function (b) { b.addEventListener('click', function () { go(b.dataset.step); }); });
  $$('[data-go]').forEach(function (b) { b.addEventListener('click', function () { go(b.dataset.go); }); });
  single($('#hmsCase')); single($('#hmsRoom'));
  $$('#hmsTests button').forEach(function (b) { b.addEventListener('click', function () { b.classList.toggle('on'); }); });
  $('#hmsRoom').addEventListener('click', function () {
    $('#hmsTokRoom').textContent = $('#hmsRoom .on').textContent.split(' · ')[0];
  });
  $('#hmsBook').addEventListener('click', function () { $('#hmsTok').hidden = false; });
  $('#hmsAdd').addEventListener('click', function () {
    extras.push(extraPool[extras.length % extraPool.length]); renderBill();
  });
  $('#hmsPrint').addEventListener('click', function () {
    var m = $('#hmsMsg'); m.textContent = 'Demo only: the real system opens a print-ready case summary.';
    setTimeout(function () { m.textContent = ''; }, 3500);
  });
  renderBill();
})();
