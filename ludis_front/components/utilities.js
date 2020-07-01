export function datefinder(dateObject) {
    const months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formatted_date = months[dateObject.getMonth()] + " " + dateObject.getDate() + ', ' + dateObject.getFullYear()
    return formatted_date;
};

export function datefinderShort(dateObject) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formatted_date = (dateObject.getDate()+1) + ' ' + months[dateObject.getMonth()] + ' ' + dateObject.getFullYear()
    return formatted_date
}

export function dateStandardize(date) {
    month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

// inserts an item into the list and sorts
export function insertItem(itemArray, item) {
    itemArray.push(item)
    return itemArray.sort((a, b) => (new Date(a.due_date)) - (new Date(b.due_date)))
}

