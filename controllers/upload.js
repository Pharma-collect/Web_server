const utils = require('./utils');

exports.upload = async function(req, res){
  let my_upload;

  try {
    my_upload = await utils.uploadMedia(req);
  } catch (e) {
    console.log(e)
  }

  if(my_upload.success){
    res.status(200).json({
      success: true,
      result: my_upload.url
    })
  }else{
    res.status(my_upload.errorCode).json({
      success: false,
      error: my_upload.error
    })
  }
}
