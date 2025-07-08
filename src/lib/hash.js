import bcrypt from "bcrypt"

const SALT_ROUND = Number(process.env.SALT_ROUND)


export const hashPassword =async(plainText)=>{
    return await bcrypt.hash(plainText,SALT_ROUND)
}

export const comparePassword = async(plainText,hashText)=>{
    return await bcrypt.compare(plainText,hashText)
}