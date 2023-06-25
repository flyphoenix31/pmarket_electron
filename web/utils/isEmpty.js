module.exports = (value) => {
    return value === undefined || value === null || value === "" || (typeof(value) === "object" && Object.keys(value).length == 0);
}