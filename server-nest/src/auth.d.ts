import '@nestjs/jwt'

declare module '@nestjs/jwt' {
  export interface NestjsJWT {
    user: {
      sub: string
      name: string
      avatarUrl: string
    }
  }
}
