import FragmentInterface from '~/apollo/fragments/FragmentInterface'

export function useFragment (fragment: FragmentInterface) {
  return '...' + fragment.name
}

export function defineFragment (fragment: FragmentInterface) {
  return fragment
}
