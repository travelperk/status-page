import { createContext } from 'react'
import { User } from '../api'

export default createContext<User>({ email: '' })
