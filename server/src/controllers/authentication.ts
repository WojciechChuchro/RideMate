import express, {Request, Response} from 'express'
import Users from '../database/models/users.model'
import {authentication, generateSessionToken, random} from '../helpers'
import jwt from 'jsonwebtoken'

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const {email, password} = req.body
    const user = await Users.getUserByEmail(email)

    if (!user) {
      return res.status(404).json({message: 'User not found'})
    }

    const expectedHash = authentication(user.salt, password)

    if (await Users.getHashPassword(user.email) !== expectedHash) {
      return res.status(401).send({message: 'invalid password'})
    }

    const sessionToken = generateSessionToken(user.id.toString())
    await Users.query().findById(user.id).patch({sessionToken})
    console.log(sessionToken)
    // Set the cookie
    res.cookie('JsonWebToken', sessionToken, {
      httpOnly: true,
      secure: true,  // secure: true only in production, assuming you're not using HTTPS in development
      sameSite: 'none',  // 'lax' or 'strict' depending on your needs
      domain: 'localhost',
      path: '/' // makes it available for the entire domain
    })


    return res.status(200).json({'message': 'login success'}).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}


export const register = async (req: express.Request, res: express.Response) => {
  try {
    const {email, password, name, surname, phoneNumber} = req.body

    const user = await Users.getUserByEmail(email)

    if (user) {
      return res.status(404).json({message: 'User with provided email already exists'})
    }

    const salt = random()
    await Users.query().insert({
      name,
      surname,
      phoneNumber,
      email,
      password: authentication(salt, password),
      salt,
      modelId: 25,
    })


    return res.status(200).json({'message': 'Register success'}).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

// Assuming you have a type or interface for the JWT payload (e.g., `JwtPayload`).
// If not, you can replace JwtPayload with any, or better, define an appropriate type.
// import { JwtPayload } from 'your_jwt_payload_type_path';

export const validateJWT = (req: Request, res: Response): Response | void => {
  const {JsonWebToken} = req.cookies

  if (!JsonWebToken) {
    return res.status(401).json({message: 'Unauthorized: Missing token'})
  }

  const token: string = Array.isArray(JsonWebToken) ? JsonWebToken[0] : JsonWebToken

  try {
    // Ensuring process.env.SECRET_KEY is a string. You might want to have a better check for this.
    jwt.verify(token, process.env.SECRET_KEY as string, (err: jwt.JsonWebTokenError | jwt.NotBeforeError | jwt.TokenExpiredError | null) => {
      if (err) {
        // If there's an error during verification, it could mean the token is invalid or expired.
        return res.status(401).json({message: 'Unauthorized: Invalid token'})
      }

      return res.status(200).json({message: 'Token is valid', isValid: true})
    })
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({message: 'Unauthorized: Token has expired'})
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({message: 'Unauthorized: Invalid token'})
    }
    return res.status(500).json({message: 'Internal Server Error'})
  }
}


