export const ObjectAssignmentHelpers = {
    ChangeSelectionById,
    ToLongDate
}

function ChangeSelectionById(obj, id) {
    const newObj = unsetSelection(obj);
    newObj.find(x => x.id === id).selected = true;
    return newObj;
}

function ToLongDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' });
}

function unsetSelection(obj) {
    return obj.map(x => 
        ({ ...x, selected: false })
    );
}