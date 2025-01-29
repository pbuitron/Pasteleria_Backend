import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';


//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//const __path = path.join(__dirname, '../public/img')
//console.log(__path);


const storage = multer.diskStorage({
    destination: (req, file, cd)=>{
        cd(null, 'src/public/img'  )
    },
    filename: (req, file, cb) => {
      
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')

        const formattedDate = `${year}${month}${day}_${hours}${minutes}${seconds}`
        const ext = path.extname(file.originalname)
        const filename = `${file.fieldname}_${formattedDate}${ext}`


        cb(null, filename);
    }

})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/avif') {
      cb(null, true)
    } else {
      cb(new Error('Solo se aceptan archivos AVIF, JPG y PNG'), false)
    }
  }



const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
})

export default upload