"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveBase64AsImage = exports.convertBase64InImage = exports.generateLinkForImage = void 0;
const fs = require("fs");
const path = require("path");
const generateLinkForImage = (fileName) => {
    return `http://localhost:3001/images/${fileName}`;
};
exports.generateLinkForImage = generateLinkForImage;
const convertBase64InImage = (base64, fileName) => {
    const buffer = Buffer.from(base64, "base64");
    const imagePath = path.join(__dirname, "..", "imagens", fileName);
    fs.writeFileSync(imagePath, buffer);
    return imagePath;
};
exports.convertBase64InImage = convertBase64InImage;
const saveBase64AsImage = (base64, mimeType) => {
    return { inlineData: { data: base64, mimeType } };
};
exports.saveBase64AsImage = saveBase64AsImage;
// imagem para o uso de test
const useImg = "";
