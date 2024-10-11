const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

async function connectToDatabase() {
    try {
        await prisma.$connect()
        .then(()=>{
            console.log("connected to Database")
        })
    } catch (error) {
        await retryConnection(3)
    }
}

async function retryConnection(retries) {
    for (let i = 0; i < retries; i++) {
        try {
            await prisma.$connect();
            return; // Connection successful, exit retry loop
        } catch (error) {
            if (i < retries - 1) {
                // Delay before retrying
                const delay = Math.pow(2, i) * 1000; // Exponential backoff
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
}

module.exports = {
    connectToDatabase,
    prisma
}
