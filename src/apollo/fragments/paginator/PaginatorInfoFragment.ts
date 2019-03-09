import AbstractFragment from '~/apollo/fragments/FragmenBase'

class PaginatorInfoFragment extends AbstractFragment {
  public name = 'PaginatorInfoFragment'
  public onType = 'PaginatorInfo'
  public value = `
    count
    currentPage
    perPage
    total
    lastPage
  `
}

export default new PaginatorInfoFragment()
