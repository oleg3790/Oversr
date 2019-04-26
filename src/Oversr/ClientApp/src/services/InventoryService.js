import { RequestHandler } from './RequestHandler';

export const InventoryService = {
    GetAllDesigners,
    SaveNewDesigner,
    EditDesigner,
    GetAllStyles,
    GetAllStylesByDesigner,
    SaveNewStyle,
    EditStyle,
    GetAllInventoryStatuses,
    SaveNewSampleInventoryItem,
    GetSampleInventoryItems
};

async function GetAllDesigners(enabledOnly = false) {
    return await RequestHandler.Get(`/api/Designers?enabledOnly=${enabledOnly}`);
}

async function SaveNewDesigner(designer) {
    return await RequestHandler.Post('/api/Designers', { name: designer });
} 

async function EditDesigner(designer) {
    return await RequestHandler.Put('/api/Designers', designer);
} 

async function GetAllStyles(enabledOnly = false) {
    return await RequestHandler.Get(`/api/Styles?enabledOnly=${enabledOnly}`);
}

async function GetAllStylesByDesigner(designerId) {
    return await RequestHandler.Get(`/api/Styles/Designer/${designerId}/?enabledOnly=false`);
}

async function EditStyle(style) {
    return await RequestHandler.Put('/api/Styles', style);
}

async function SaveNewStyle(style) {
    return await RequestHandler.Post('/api/Styles', style);
}

async function GetAllInventoryStatuses() {
    return await RequestHandler.Get('/api/SampleInventory/Statuses/');
}

async function GetSampleInventoryItems(status) {
    return await RequestHandler.Get(`/api/SampleInventory?status=${status}`);
}

async function SaveNewSampleInventoryItem(data) {
    return await RequestHandler.Post('/api/SampleInventory', data);
}