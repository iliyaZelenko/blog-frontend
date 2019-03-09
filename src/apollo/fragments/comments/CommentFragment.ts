import AbstractFragment from '~/apollo/fragments/FragmenBase'

class CommentFragment extends AbstractFragment {
  public name = 'CommentFragment'
  public onType = 'Comment'
  public value = `
    id
    content
    createdAt
    ratingValue
    ratingValuePositive
    ratingValueNegative
    repliesCount
    allRepliesCount
    user {
      id
      nickname
      fullName
      avatar {
        sm
        md
      }
      createdAt
      gender
      age
    }
    repliedComment {
      user {
        nickname
      }
    }
  `

  public toString () {
    return `
      fragment ${this.name} on ${this.onType} {
        ${this.value}
      }
    `
  }
}

export default new CommentFragment()
