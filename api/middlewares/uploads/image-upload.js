const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img')
    },
    filename: function (req, file, cb) {
        const mimeExtension = {
            'image/jpeg': '.jpeg',
            'image/jpg': '.jpg',
            'image/png': '.png',
        }
        cb(null, file.fieldname + '-' + Date.now() + mimeExtension[file.mimetype]);
    }
})

exports.upload_image = multer({

    storage: storage,
    fileFilter: (req, file, cb ) => {
        // console.log(file.mimetype)
        if(file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/gif') {
            cb(null, true);        
        } else {
            cb(null, false);
            req.fileError = 'File format is not valid';
        }
    }
 })

// exports.upload_image = (req , res , next) => {
//         console.log("upload middleware start")
//         if (!req.files)
//             return res.status(400).json({
//                 message: "No files were uploaded.",
//             });;
//         var file = req.files.image;
//         var img_name=file.name;
//          if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){

//             const name = Date.now()+file.name;
                                
//             file.mv('public/img/'+name, function(err) {
//                 if(err){
//                     return res.status(400).json({
//                         message: err.message,
//                     });

//                 }else {
//                     req.files.filename = name;
//                     console.log("call next for controller")
//                     next();
//                 }
//             });
//           } else {
//             return res.status(400).json({
//                 message: "File format is not valid",
//             });
//           }
// };

