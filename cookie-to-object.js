const R = require('ramda');
const _ = require('lodash');
const fp = require('lodash/fp');
const timeit = require('./timeit');

const document = {
  cookie:
    'vs_access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InozSmVpZEZYTVZMenZqYlFxMTJoLWpMR2dUR2dWUEUzT180ZUprbVpwVnJ3bmhxUkRoIiwidmVyc2lvbiI6NS4xfQ.eyJ0eXBlIjoiZW1wbG95ZWUiLCJwcm92aWRlcklkIjoiMDB1ZXk2Z2lvZDhlS0VmOFUweDciLCJqd3RpZCI6IjhkOGMxYjBmLWU0YTgtNGJmZC05Y2U2LTkzZmIyZGU4MWU0ZiIsImlhdCI6MTUyMTEyMzQwMywiZXhwIjoxNTIxMjA5ODAzLCJpc3MiOiJodHRwczovL3BsYXRmb3JtLnN0YWdlLnZpdmludHNvbGFyLmNvbSIsImp0aSI6IjhkOGMxYjBmLWU0YTgtNGJmZC05Y2U2LTkzZmIyZGU4MWU0ZiJ9.PuPOpsaAlm3juk2yllIMn5rYheoKkLIr6HYIn0r_y77eI8l2fG_xWLGIDD3COJoxwb1UOrvvAJTtwW0AEQOk3WdXcYAU2HbsHGPD03tLyaGaN6AfxrWJfbjQu4KHKlzsJkpd1am9Rpqm6fWDsWArK_UBptzavOQolBbWmE9Oxso5_dcks9vnND_9QaxmB-asU5U18SNkz28N8nmTzhG6lTjfMbSz1jgwyFWF8H6pk3fCUP-e68oxSZoS1EGPrRldh5Kt2tzLAu5J6URO79F2g-g16F8ADDcni_2EXhgqEXjsI4hlIuaqZ5mXti1GhXztVPIz3BTboRWBDGr13797tA'
};

const vanilla = cookie => {
  return cookie
    .split(';')
    .map(x => x.trim())
    .filter(x => x)
    .map(x => x.split('='))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

const ramdaCookie = R.pipe(
  R.split(';'),
  R.map(R.trim),
  R.filter(R.identity),
  R.map(R.split('=')),
  R.fromPairs
);
const lodashCookie = cookie => _.chain(cookie)
  .split(';')
  .map(_.trim)
  .filter(_.identity)
  .map(x => _.split(x, '='))
  .fromPairs()
  .value();

const lodashFp = fp.pipe(
  fp.split(';'),
  fp.map(fp.trim),
  fp.filter(fp.identity),
  fp.map(fp.split('=')),
  fp.fromPairs
);

timeit('Vanilla', vanilla, document.cookie);
timeit('Ramda', ramdaCookie, document.cookie);
timeit('Lodash', lodashCookie, document.cookie);
timeit('Lodash FP', lodashFp, document.cookie);
