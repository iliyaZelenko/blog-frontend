import FragmentInterface from '~/apollo/fragments/FragmentInterface'

export default abstract class AbstractFragment implements FragmentInterface {
  public abstract name: string
  public abstract onType: string
  public abstract value: string

  public toString () {
    return `
      fragment ${this.name} on ${this.onType} {
        ${this.value}
      }
    `
  }
}
