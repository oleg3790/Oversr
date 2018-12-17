import { RequestHandler } from './RequestHandler';

export const DesignerService = {
    GetAllDesigners,
    SaveNewDesigner
};

async function GetAllDesigners() {
    return await RequestHandler.Get('/api/Designers/');
}

async function SaveNewDesigner(designer) {
    return await RequestHandler.Post('api/Designers/', { name: designer });
} 