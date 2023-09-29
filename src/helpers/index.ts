
export const formatPrice = (value: string | undefined) => {
    const valueInteger = Number(value).toFixed(2)
    return "$" + valueInteger.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
