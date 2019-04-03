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

export enum Avatars {
  AVATAR_SM = 'sm',
  AVATAR_MD = 'md',
  AVATAR_LG = 'lg',
  AVATAR_CIRCLE = 'circle'
}

export interface AvatarInterface {
  [Avatars.AVATAR_SM]: string
  [Avatars.AVATAR_MD]: string
  [Avatars.AVATAR_LG]: string
  [Avatars.AVATAR_CIRCLE]: string
}

export type AvatarSizeTypes = Avatars.AVATAR_LG | Avatars.AVATAR_MD | Avatars.AVATAR_SM | Avatars.AVATAR_CIRCLE

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
