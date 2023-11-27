import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from 'multer'; 

//config dirname para rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

 
//config muter para carga de archivos ()
const storage = multer.diskStorage({
    //destino
    destination: function(req, file, callBack){
        callBack(null, `${__dirname}/public/img` ) //especifico la carpeta destino
    },
    //filename - nombre final del archivo
    filename: function  (req, file, callBack){
        console.log(file),
        callBack(null, `${Date.now()}-${file.originalName}`) //    se indica que se mantenga el nombre inicial
    }
})


export const uploader = multer({storage})

export default __dirname;