import { RequestHandler } from './RequestHandler';

export const InventoryService = {
    GetAllDesigners,
    SaveNewDesigner,
    EditDesigner,
    GetAllInventoryStatuses,
    SaveNewSampleInventoryItem,
    GetSampleInventoryItems
};

async function GetAllDesigners() {
    return await RequestHandler.Get('/api/Designers/false');
}

async function SaveNewDesigner(designer) {
    return await RequestHandler.Post('api/Designers/Create', { name: designer });
} 

async function EditDesigner(designer) {
    return await RequestHandler.Post('api/Designers/Edit', designer);
} 

async function GetAllInventoryStatuses() {
    return await RequestHandler.Get('/api/SampleInventory/Statuses/');
}

async function GetSampleInventoryItems(status) {
    return await RequestHandler.Get('api/SampleInventory/' + status);
}

async function SaveNewSampleInventoryItem(data) {
    return await RequestHandler.Post('api/SampleInventory/Create/', data);
}