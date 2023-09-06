const pagination = (skip: number, take: number, total: number) => {
  let page = 0;
  if ((!skip && total > 0) || skip === 0) page = 1;
  else if (!skip) page = 0;
  else page = skip / 10;
  return {
    page,
    limit: 10,
    total,
  };
};

export default pagination;
