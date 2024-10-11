const { logging } = require('googleapis/build/src/apis/logging');
const z = require('zod')

const userSchema = z.object({
    name:z.string({
        required_error: "Your Name is required"
    }).min(2, "name is too short"),

    email : z.string({
        required_error: "Your Email is required"
    }).email("Your email is invalid"),

    password: z.string({
        required_error:"Your Password is required",
    }).min(8, "password must be eight or more characters long"),
    confirmPassword:z.string({
        required_error:"Please enter your password again"
    }).min(8, "confirm password must be eight or more characters long")
})
.strict()
.refine(data => data.password === data.confirmPassword, {
    message:"passwords do not match",
    path:["confirmPassword"]
})



const LoginUserSchema = z.object({
    email: z.string({
      required_error: "Email is required",
    }).email("Invalid email"),
    password: z.string({
      required_error: "Password is required",
    }),
})
.strict();

const courseSchema = z.object({
    name: z.string().min(1, { message: "Course name is required" }),
    coverpic: z.string().url({ message: "Cover picture must be a valid URL" }),
    category: z.enum(['artsandhumanities', 'webdesign', 'general', 'webdevelopment'], { message: "Invalid category" }),
    createdBy: z.string().min(1, { message: "Creator's ID is required" }),
    Amount: z.number().positive({ message: "Amount must be a positive number" }),
    Rating: z.number().min(0).max(5).optional(),
  });
  
 

module.exports = {
    userSchema,
    LoginUserSchema,
    courseSchema
}