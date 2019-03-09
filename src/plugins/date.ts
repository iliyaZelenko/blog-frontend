export default ({ }, inject) => {
  const $date = (date: string | Date) => {
    if (!(date instanceof Date)) {
      date = new Date(date)
    }

    return date.toLocaleString()
  }

  inject('date', $date)
}
