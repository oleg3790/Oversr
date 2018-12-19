import { RequestHandler } from './RequestHandler';

export const SampleInventoryService = {
    GetAllDesigners,
    SaveNewDesigner,
    GetAllInventoryStatuses
};

async function GetAllDesigners() {
    return await RequestHandler.Get('/api/Designers/');
}

async function SaveNewDesigner(designer) {
    return await RequestHandler.Post('api/Designers/', { name: designer });
} 

async function GetAllInventoryStatuses() {
    return await RequestHandler.Get('/api/SampleInventory/Statuses/');
}