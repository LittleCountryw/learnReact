const baseObj = {
  banners: {
    key1: { innerk1: 1, innerk2: 2, innerk3: 3 },
    key2: 2,
  },
  footer: ['ABC', 'CBA', 'BAC', { innerk1: 1, innerk2: 2, innerk3: 3 }],
  variable: 23,
}

const copyObj = { ...baseObj, footer: [123, 456] }

console.log(baseObj.banners === copyObj.banners) //true

const baseArr = [
  { key1: '123', key2: { innerk1: 'abc', innerk2: 'dfg' } },
  'james',
  [123, 455, 677],
]

const copyObj = [...baseArr]
