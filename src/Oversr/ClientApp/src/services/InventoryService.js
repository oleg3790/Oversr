import { RequestHandler } from './RequestHandler';

export const InventoryService = {
    GetAllDesigners,
    SaveNewDesigner,
    EditDesigner,
    GetAllStyles,
    GetAllStylesByDesigner,
    SaveNewStyle,
    GetAllInventoryStatuses,
    SaveNewSampleInventoryItem,
    GetSampleInventoryItems
};

async function GetAllDesigners(enabledOnly = false) {
    return await RequestHandler.Get(`/api/Designers/${enabledOnly}`);
}

async function SaveNewDesigner(designer) {
    return await RequestHandler.Post('/api/Designers/Create', { name: designer });
} 

async function EditDesigner(designer) {
    return await RequestHandler.Post('/api/Designers/Edit', designer);
} 

async function GetAllStyles(enabledOnly = false) {
    return await RequestHandler.Get(`/api/Styles/${enabledOnly}`);
}

async function GetAllStylesByDesigner(designerId) {
    return await RequestHandler.Get(`/api/Styles/Designer/${designerId}/false`);
}

async function SaveNewStyle(style) {
    return await RequestHandler.Post('/api/Styles/Create', style);
}

async function GetAllInventoryStatuses() {
    return await RequestHandler.Get('/api/SampleInventory/Statuses/');
}

async function GetSampleInventoryItems(status) {
    return await RequestHandler.Get(`/api/SampleInventory/${status}`);
}

async function SaveNewSampleInventoryItem(data) {
    return await RequestHandler.Post('/api/SampleInventory/Create/', data);
}