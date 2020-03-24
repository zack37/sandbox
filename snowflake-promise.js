const executeAsync = connection => params => {
  return new Promise((resolve, reject) => {
    const executeConfig = {
      ...params,
      complete: (err, stmt, rows) => (err ? reject(err) : resolve(rows)),
    };

    return connection.execute(executeConfig);
  });
};
