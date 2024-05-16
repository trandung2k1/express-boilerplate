declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      PORT: string
    }
  }
  namespace Express {
    interface User {
      id: string
      email: string
      isAdmin: boolean
    }
    interface Request {
      user?: User
      file?: Multer.File | undefined
    }
  }
}

export {}
