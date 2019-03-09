import { PostsInterface } from '~/apollo/schema/posts'
import { CommentsInterface } from '~/apollo/schema/comments'

export interface UserInterface {
  id: number
  createdAt: string
  updatedAt: string
  nickname: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  avatar: AvatarInterface
  gender: UserGenderStatus
  birthday: string
  posts: PostsInterface
  comments: CommentsInterface
}

export const AVATAR_SM = 'sm'
export const AVATAR_MD = 'md'
export const AVATAR_LG = 'lg'
export const AVATAR_CIRCLE = 'circle'

type AVATAR_SM = 'sm'
type AVATAR_MD = 'md'
type AVATAR_LG = 'lg'
type AVATAR_CIRCLE = 'circle'

export interface AvatarInterface {
  [AVATAR_SM]: string
  [AVATAR_MD]: string
  [AVATAR_LG]: string
  [AVATAR_CIRCLE]: string
}

export type AvatarSizeTypes = AVATAR_LG | AVATAR_MD | AVATAR_SM | AVATAR_CIRCLE

export const GENDER_MALE = 'MALE'
export const GENDER_FEMALE = 'FEMALE'
export const GENDER_MALE_READABLE = 'MALE'
export const GENDER_FEMALE_READABLE = 'FEMALE'
export const GENDER_INFO = {
  status: {
    male: GENDER_MALE,
    female: GENDER_FEMALE
  },
  readable: {
    male: GENDER_MALE_READABLE,
    female: GENDER_FEMALE_READABLE
  }
}

type GENDER_MALE = 'MALE'
type GENDER_FEMALE = 'FEMALE'

export type UserGenderStatus = GENDER_MALE | GENDER_FEMALE
