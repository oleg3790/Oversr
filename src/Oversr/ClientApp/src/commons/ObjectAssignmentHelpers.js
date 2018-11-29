export const ObjectAssignmentHelpers = {
    changeSelectionById
}

function changeSelectionById(obj, id) {
    const newObj = unsetSelection(obj);
    newObj.find(x => x.id == id).selected = true;
    return newObj;
}

function unsetSelection(obj) {
    return obj.map(x => 
        ({ ...x, selected: false })
    );
}