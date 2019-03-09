import AbstractFragment from '~/apollo/fragments/FragmenBase'

class PostFragment extends AbstractFragment {
  public name = 'PostFragment'
  public onType = 'Post'
  public value = `
    id
    title
    titleSlug
    contentShort
    createdAt
    ratingValue
    ratingValuePositive
    ratingValueNegative
    user {
      id
      avatar {
        sm
        md
      }
      createdAt
      nickname
      fullName
      gender
      age
    }
  `
}

export default new PostFragment()
