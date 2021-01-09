const express = require('express');
const router = express.Router();
// const { User } = require("../models/Video");

const { auth } = require("../middleware/auth");
// 이를 이용해서 파일을 서버로 보냄.
const multer = require("multer");

// STORAGE MULTER Config
let storage = multer.diskStorage({
  // 파일을 올리는 목적지.. 저장위치
  destination: {req, file, cb} =>{
    cb(null, "uploads/");
  },
  // 날짜_파일이름 형식으로 저장됨
  filename: {req, file, cb} =>{
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  // 허용 확장자 지정
  fileFilter: {req, file, cb} =>{
    const ext = path.extname(file.originalname)
    if(ext !== '.mp4'){
      return cb(res.status(400).end('only mp4 is allowed'), false);
    }
    cb(null, true);
  }
});

const upload = multer({ storage: storage }).single("file")


//=================================
//             Video
//=================================
router.post('/uploadfiles',(req, res) => {

    //비디오를 서버에 저장한다.
    upload(req, res, err => {
      if(err){
        return res.json({success : false, err})
      }
      // url : 파일 업로드시 저장하는 폴더 경로임.
      return res.json({success : true, url: res.req.file.path, filename: res.req.file.filename })
    })
})

module.exports = router;
