exports.escapeHTML = (str) => {
    if (typeof (str) != 'string') return str;
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

exports.getProperPagination = (page, perPage, totalCount) => {
    page = Number(page) ?? 0;
    perPage = Number(perPage) ?? 0;
    if (page < 1) page = 1;
    if (perPage < 1) perPage = 10;
    let totalPage = Math.ceil(totalCount / perPage);
    if (totalPage < page) page = totalPage;
    return {page, perPage, totalCount};
}