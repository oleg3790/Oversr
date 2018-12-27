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
    return date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function unsetSelection(obj) {
    return obj.map(x => 
        ({ ...x, selected: false })
    );
}