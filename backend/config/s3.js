const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname + '/awsconfig.json')

const s3 = new AWS.S3();

/* S3.listBuckets(function(err, data) {
    if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Buckets);
      }
}) */

/* const storage = multerS3({
    s3 : s3,
    bucket : BUCKET_NAME,
    contentType : multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
    },
    key : function(req, file, cd) {
        cd(null, `popup/${req.params.id}.png`);
    }
}) */

/*
    Popup
*/
const Popup =  {
    BUCKET_NAME : 'sizelityimagebucket',
    upload : multer({
        storage : multerS3({
            s3 : s3,
            bucket : 'sizelityimagebucket',
            contentType : multerS3.AUTO_CONTENT_TYPE,
            acl: 'public-read',
            key : function(req, file, cd) {
                cd(null, `popup/${req.params.id}.png`);
            }
        })
    }),
    remove : async function(ADID) {
        try  {
            return await s3.deleteObject({
                Bucket : this.BUCKET_NAME,
                Key : `popup/${ADID}.png`
            }).promise().then(() => {
                return true;
            }).catch(err => {
                return false;
            });
        } catch(err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = {
    Popup
}
//exports.upload = multer({storage : storage})
