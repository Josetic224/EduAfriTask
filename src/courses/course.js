const { courseSchema } = require("../validations/validator");


exports.createCourse = async (req, res) => {
    const body = courseSchema.safeParse(req.body);
  
    if (!body.success) {
      return res.status(400).json({
        errors: body.error.issues,
      });
    }
  
    const { name, coverpic, category, createdBy, Amount, Rating } = body.data;
  
    try {
      const newCourse = await prisma.courses.create({
        data: {
          name,
          coverpic,
          category,
          createdBy,
          Amount,
          Rating,
        },
      });
  
      return res.status(201).json({
        message: "Course created successfully",
        newCourse,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        message: "Failed to create course",
      });
    }
  };