const {prisma} = require('../config/config')

const dotenv = require('dotenv')
dotenv.config()

const {sign} = require('jsonwebtoken')
const {hash, compare} = require('bcryptjs')

const getUserById = async(id)=>{
    try {
        const user = await prisma.user.findUnique({
            where:{id}
        })
        if(!user){
            throw new Error("User not Found")
        }
    } catch (error) {
       throw new Error("failed to fetch user by Id") 
    }
}


const getUserByEmail = async (email)=>{
    const user = await prisma.user.findUnique({where: {email:email}})
    return user;
}


const signUser = async(name, email, password) =>{
    try {

      
        const encryptedPassword = await hash(password, 12)


        const userData = {
            name,
            email,
            password: encryptedPassword, // Store hashed password in the database
          };

          const newUser = await prisma.user.create({
            data:userData
          })

          return newUser
    } catch (error) {
        console.error(error.message)
        throw new Error("failed to create User")
        
    }
} 


const loginUser = async (email, password) => {

    const user = await getUserByEmail(email)

if(!user || !compare(password, user.password)){
  throw new Error("Invalid credentials")
}
const jwtSecret = process.env.JWT_SECRET
const token = sign({id:user.id, role:user.role}, jwtSecret, {expiresIn:'7d'})
    return token ;
  };




// Service to create a new course
const createCourse = async (name, coverpic, category, createdBy, amount) => {
    try {
        const courseData = {
            name,
            coverpic,
            category,          // Category should match the enum in the Prisma schema
            createdBy,
            Amount: amount,     // Assuming Amount is an integer value
            Rating: 0           // Assuming new courses have a default Rating of 0
        };

        const newCourse = await prisma.courses.create({
            data: courseData
        });

        return newCourse;
    } catch (error) {
        console.error(error.message);
        throw new Error("Failed to create course");
    }
};
module.exports ={
    signUser,
    getUserByEmail,
    loginUser,
    createCourse
}
