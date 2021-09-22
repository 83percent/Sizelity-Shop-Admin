const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const path = require("path");
const ENV_PATH = path.resolve(__dirname, "../../.env");
require('dotenv').config({path : ENV_PATH});

const s3 = new AWS.S3({
    accessKeyId : process.env.ACCESS_KEY,
    secretAccessKey : process.env.ACCESS_SECRET,
    region : process.env.REGION
});

/* s3.listBuckets(function(err, data) {
    console.log("CHECK START");
    if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Buckets);
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
                Key : `ad/popup/${ADID}.png`
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

const Event = {
    BUCKET_NAME : 'sizelityimagebucket',
    upload : multer({
        storage : multerS3({
            s3: s3,
            bucket : 'sizelityimagebucket',
            contentType : multerS3.AUTO_CONTENT_TYPE,
            acl: 'public-read',
            key : function(req, file, cd) {
                cd(null, `ad/event/${req.params.id}.png`);
            }
        })
    }),
    remove : async function(ADID) {
        try  {
            return await s3.deleteObject({
                Bucket : this.BUCKET_NAME,
                Key : `ad/event/${ADID}.png`
            }).promise().then(() => {
                return true;
            }).catch(err => {
                return false;
            });
        } catch(err) {
            console.log(err);
            return false;
        }
    },
    copy : {

    }
}
module.exports = {
    Popup,
    Event
}
