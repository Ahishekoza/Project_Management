import bcrypt from "bcrypt"

const SALT_ROUND = process.env.SALT_ROUND

export const hashPassword =async(plainText)=>{
    return await bcrypt.hash(plainText,SALT_ROUND)
}

export const comparePassword = async(plainText,hashedText)=>{
    return await bcrypt.compare(plainText,hashPassword)
}