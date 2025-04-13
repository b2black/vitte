import jwt from 'jsonwebtoken'
import type { SignOptions, JwtPayload } from 'jsonwebtoken'

class TokenGenerator {
  async generate(
    payload: Record<string, unknown>,
    key: string,
    options: SignOptions,
  ): Promise<string> {
    return jwt.sign(payload, key, options)
  }

  async validate(token: string, key: string): Promise<JwtPayload | string> {
    return jwt.verify(token, key)
  }
}

export const tokenGenerator = new TokenGenerator()
