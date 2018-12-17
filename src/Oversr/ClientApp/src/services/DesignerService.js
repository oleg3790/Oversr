import { RequestHandler } from './RequestHandler';

export const DesignerService = {
    GetAllDesigners
}

async function GetAllDesigners() {
    return await RequestHandler.Get('/api/Designers/');
}