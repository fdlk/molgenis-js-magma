import { $ as unbound$ } from './'

const chocChip = {
  _idValue: 1,
  id: 1,
  name: 'Chocolate chip',
  tastiness: '9/10',
}
const strawberry = {
  _idValue: 2,
  id: 2,
  name: 'Strawberry',
  tastiness: '10/10',
}
const banana = { _idValue: 3, id: 3, name: 'Banana', tastiness: '7/10' }

const dob = new Date()
dob.setTime(dob.getTime() - 18 * (365.2425 * 24 * 60 * 60 * 1000))

const entity = {
  id: 'A',
  cookie: chocChip,
  cookies: [chocChip, strawberry, banana],
  dob: dob,
  myStringAttributeName: 'abcde0123',
  myIntAttributeName: 4,
  height: 180,
  name: 'caroline',
  hasEars: true,
  male: false,
  female: true,
  pregnant: true,
  data: 1,
  gender: { _idValue: 'm', id: 'm', label: 'Male' },
}

const $ = unbound$.bind(entity)

describe('$ function', () => {
  it('should return the attribute value', () => {
    expect($('dob').value()).toBe(dob)
  })

  it('should work for references', () => {
    expect($('cookie').value()).toBe(chocChip)
  })

  it('should not return nested attributes when using dot notation', () => {
    expect(() => $('cookie.name').value()).toThrow(
      "Unknown attribute 'cookie.name'",
    )
  })

  it('should work for references', () => {
    expect($('cookies').value()).toEqual([chocChip, strawberry, banana])
  })
})
