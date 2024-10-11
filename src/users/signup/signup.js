const {signUser, getUserByEmail, loginUser} = require('../../services/service')
const { badRequest } = require('../../utilities/error')
const {userSchema, LoginUserSchema} = require('../../validations/validator')


exports.signup =async(req, res)=>{
    const body = userSchema.safeParse(req.body)

    if(!body.success){
        return res.status(400).json({
            errors:body.error.issues
        })
    }

    const {name, email, password, role} = body.data
    let checkEmail = await getUserByEmail(email)
    if(checkEmail){
        return res.status(400).json({
            message:"THis email is already registered"
        })
    }

    const newUser = await signUser(name, email, password,role )
    console.log(newUser)
    
//  await sendEmail({
//     email:email,
//     html: generateDynamicEmail(fullName),
//     subject:"THANKS FOR SIGNING UP"
//  })
return res.status(200).json({
    message:"User Signed UP successfully",
    newUser
})
}

exports.login =async(req, res)=>{
try {
    const body = LoginUserSchema.safeParse(req.body)
if(!body.success){
    return res.status(400).json({
        errors:body.error.issues
    })
}

const {email, password} = body.data

const LoginUser = await loginUser(email, password)

return res.status(200).json({
    message:"User Logged in successfully",
    token:LoginUser
})
} catch (error) {
    res.status(400).json({
        message:error.message
    })
}



}