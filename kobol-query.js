const fs = require('fs');
const { promisify } = require('util');
const axios = require('axios');

const writefile = promisify(fs.writeFile);

async function query() {
  try {
    const { data } = await axios({
      method: 'GET',
      url: 'http://localhost:3000/v3/office-assignments?limit=32375',
      headers: {
        authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InozSmVpZEZYTVZMenZqYlFxMTJoLWpMR2dUR2dWUEUzT180ZUprbVpwVnJ3bmhxUkRoIiwidmVyc2lvbiI6NS4xfQ.eyJ0eXBlIjoiZW1wbG95ZWUiLCJwcm92aWRlcklkIjoiMDB1ZXk2Z2lvZDhlS0VmOFUweDciLCJqd3RpZCI6Ijk1M2QwMjU3LWVkMTAtNGQ0MS04OWU2LWZjNDJmMDE0MmRjMiIsImlhdCI6MTUyNDc2MjI1OSwiZXhwIjoxNTI0ODQ4NjU5LCJpc3MiOiJodHRwczovL3BsYXRmb3JtLnN0YWdlLnZpdmludHNvbGFyLmNvbSIsImp0aSI6Ijk1M2QwMjU3LWVkMTAtNGQ0MS04OWU2LWZjNDJmMDE0MmRjMiJ9.tnb7Y2Y3sGUSbBKya-SCVn0xuITzqQ-SDrikIxz1d9y5xdcztYf5yCAfW6bHJYOpc0CF_qVevbOwTegf2TD8Q-oYq7ZGjn4TZYr0sRjQ1WeF6g_sG7ekbVVXufC24gAMME2IwK89zFA9UgmD2ka8w3rChg-2vfN7F8bFS9mBGtvGZCJ37LGWYuRUP7GvBAiibcE8fgnK23jInxlQygNkcKbVFE2sn9X1JQznXEtQ2DZaw4mrrzHbRx8SLax0pbu0zFLbXrRmQs4ikZ1RwFbQGwXqq9zDWwYFqNgyj3jJeQRHonAdYIykRQFF1WjLZEh35BZ11xOgmXlqtVvQnBOcUw',
      },
    });

    console.log('Number of records returned', data.length);

    await writefile('./data.json', JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
}

query();
