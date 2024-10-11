const {google} = require('googleapis')
const axios = require('axios')
const { prisma } = require('../../config/config')
const dotenv = require('dotenv').config()

// console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
// console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);


const oauth2client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/auth/google/callback'
)

const getGoogleAuthUrl =  () => {
    return oauth2client.generateAuthUrl({
        access_type: "offline",
        scope:[
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ],
    })
}

const authenticate = async (req, res) => {
     const authUrl = getGoogleAuthUrl()
 res.redirect(authUrl);
}


 const callback =  async (req, res) => {
    const {code} = req.query;

    try {
        const {tokens} = await oauth2client.getToken(code)
        oauth2client.setCredentials(tokens)

        //get user info from Google

        const oauth2 = google.oauth2({version : "v2", auth: oauth2client})
        const userInfo = await oauth2.userinfo.get()

        const {id: googleId, email, name} = userInfo.data

        const user = await prisma.user.upsert({
            where:{email},
            update:{
                email,
                name
            },
            create:{
                googleId,
                email,
                name
            }
        })
        res.send("Google Auth Completed and user info saved");
        console.log("Google Auth Completed and user info saved");
    } catch (error) {
        console.error("error during google Oauth Callback", error)
        res.redirect('/')
    }
}

module.exports = {
    authenticate,
    callback
}


