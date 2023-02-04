import path from "path";
import sharp from "sharp";
import fs from 'fs';
import clc from "cli-color";

const inputPath = "./input"
const outputPath = path.join(__dirname, "../output");

const formatValid = [
    ".jpeg",
    ".jpg",
    ".webp",
]

fs.readdirSync(inputPath)
    .map(fileNameWithExtension => {
        const filePath = path.join(__dirname, "../", inputPath, fileNameWithExtension);
        const fileName = path.parse( filePath ).name
        const fileExt = path.parse( filePath ).ext

        // check format
        if ( !formatValid.includes( fileExt ) ) {
            console.log( clc.red(
                `El archivo no se pudo procesar - ${fileNameWithExtension}`
            ));
            return;
        }

        // process image
        sharp(filePath)
            .toFormat("png")
            .toFile( outputPath + `/${fileName}.png` )

        console.log( clc.green(
            `El archivo se proceso - ${fileNameWithExtension}`
        ))
    })