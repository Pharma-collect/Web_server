const fs = require('fs');
const path = require('path');

exports.upload = function(req, res){
  const {
      filetype
  } = req.body;

  if (!req.files || Object.keys(req.files).length === 0) {
      res.status(500).json({
        success: false,
        error: "No files were uploaded.",
    })
  }

  let targetFile = req.files.file;
  let extName = path.extname(targetFile.name);
  let baseName = path.basename(targetFile.name, extName);

  let imgList = ['.png','.jpg','.jpeg','.gif'];
  // Checking the file type
  if(!imgList.includes(extName)){
      fs.unlinkSync(targetFile.tempFilePath);
      res.status(422).json({
        success: false,
        error: "Invalid Image",
    })
  }

  if(targetFile.size > 1048576){
      fs.unlinkSync(targetFile.tempFilePath);
      res.status(413).json({
        success: false,
        error: "File to large",
    })
  }

  let num = 1;
  let pathUpload= ''
  let uploadDir =''
  let filetypeIsValid = true

  switch(filetype){
    case 'product':
      pathUpload = '../uploads/product'
      
      break;

    case 'avatar':
      pathUpload = '../uploads/avatar'
      break;

    case 'prescription':
      pathUpload = '../uploads/prescription'
      break;

    default:
      filetypeIsValid = false

  }

  uploadDir = path.join(__dirname, pathUpload, targetFile.name);

  if(filetypeIsValid){
    while(fs.existsSync(uploadDir)){
      uploadDir = path.join(__dirname, pathUpload , baseName + '-' + num + extName);
      num++;
    }

    const pathFile = uploadDir.split('/')
    const url='https://88-122-235-110.traefik.me/api/get_file/'

    targetFile.mv(uploadDir, (err) => {
      if (err){
          res.status(500).json({
            success: false,
            error: err,
        })
      }
      else{
        res.status(200).json({
            success: true,
            result: url + filetype + '/' + pathFile[pathFile.length -1],
        })
      }
    });
  }
  else{
    res.status(500).json({
      success: false,
      error: "Filetype is invalid. Must be 'product/prescription/avatar'",
    })
  }
}