import ScriptableValue from './ScriptableValue'

describe('ScriptableValue', () => {
  describe('any', () => {
    it('tests a single value for a list of possible values', () => {
      expect(
        new ScriptableValue('two').any('one', 'two', 'three').value(),
      ).toBe(true)
      expect(
        new ScriptableValue('four').any('one', 'two', 'three').value(),
      ).toBe(false)
      expect(new ScriptableValue('four').any().value()).toBe(false)
    })
    it('tests an array value for a list of possible values', () => {
      expect(new ScriptableValue(['one', 'two']).any('one').value()).toBe(true)
      expect(new ScriptableValue(['one', 'two']).any('three').value()).toBe(
        false,
      )
      expect(new ScriptableValue(['four']).any().value()).toBe(false)
    })
  })

  describe('all', () => {
    it('returns false when the value is null', () => {
      expect(new ScriptableValue(null).all().value()).toBe(false)
    })
    it('returns true when all values match', () => {
      expect(
        new ScriptableValue(['cat1', 'cat2', 'cat3'])
          .all('cat1', 'cat3')
          .value(),
      ).toBe(true)
    })
  })

  describe('not', () => {
    it('negates boolean value', () => {
      expect(new ScriptableValue(true).not().value()).toBe(false)
      expect(new ScriptableValue(false).not().value()).toBe(true)
    })
    it('tests for equality to argument values', () => {
      expect(new ScriptableValue('b').not('a').value()).toBe(true)
      expect(new ScriptableValue('b').not('a', 'b', 'c').value()).toBe(false)
    })
  })

  describe('binary number operator', () => {
    it('accepts unwrapped number', () => {
      expect(new ScriptableValue(15.3).plus(12.2).value()).toBe(27.5)
    })
    it('unwraps wrapped number', () => {
      expect(
        new ScriptableValue(15.3).plus(new ScriptableValue(12.2)).value(),
      ).toBe(27.5)
    })
    it('returns null if argument is null', () => {
      expect(new ScriptableValue(15.3).plus(null).value()).toBeNull()
    })
    it('throws error if argument is undefined', () => {
      expect(() => new ScriptableValue(15.3).plus(undefined)).toThrow(
        'argument is undefined',
      )
    })
    it('returns null if value is null', () => {
      expect(new ScriptableValue(null).plus(12).value()).toBeNull()
    })
  })

  describe('plus', () => {
    it('adds numbers', () => {
      expect(new ScriptableValue(15.3).plus(12.2).value()).toBe(27.5)
    })
  })

  describe('minus', () => {
    it('subtracts numbers', () => {
      expect(new ScriptableValue(15).minus(12).value()).toBe(3)
    })
  })

  describe('times', () => {
    it('divides numbers', () => {
      expect(new ScriptableValue(4.5).times(3).value()).toBe(3 * 4.5)
    })
  })

  describe('div', () => {
    it('divides numbers', () => {
      expect(new ScriptableValue(15).minus(12).value()).toBe(3)
    })
  })

  describe('pow', () => {
    it('raises to the power', () => {
      expect(new ScriptableValue(3).pow(3).value()).toBe(27)
    })
  })

  describe('abs', () => {
    it('takes absolute value', () => {
      expect(new ScriptableValue(-3).abs().value()).toBe(3)
    })
  })

  describe('compare', () => {
    it('compares booleans', () => {
      expect(
        new ScriptableValue(true).compare(new ScriptableValue(true)).value(),
      ).toBe(0)
      expect(
        new ScriptableValue(true).compare(new ScriptableValue(false)).value(),
      ).toBe(1)
      expect(
        new ScriptableValue(false).compare(new ScriptableValue(true)).value(),
      ).toBe(-1)
      expect(() =>
        new ScriptableValue(true).compare(new ScriptableValue(null)).value(),
      ).toThrow('Cannot invoke compare() with null argument.')
    })
    it('compares numbers', () => {
      expect(
        new ScriptableValue(3).compare(new ScriptableValue(3)).value(),
      ).toBe(0)
      expect(
        new ScriptableValue(3).compare(new ScriptableValue(-4.2)).value(),
      ).toBe(1)
      expect(
        new ScriptableValue(3).compare(new ScriptableValue(5.4)).value(),
      ).toBe(-1)
      expect(() =>
        new ScriptableValue(3).compare(new ScriptableValue(null)).value(),
      ).toThrow('Cannot invoke compare() with null argument.')
    })
    it('compares strings', () => {
      expect(
        new ScriptableValue('b').compare(new ScriptableValue('b')).value(),
      ).toBe(0)
      expect(
        new ScriptableValue('b').compare(new ScriptableValue('a')).value(),
      ).toBe(1)
      expect(
        new ScriptableValue('b').compare(new ScriptableValue('c')).value(),
      ).toBe(-1)
      expect(() =>
        new ScriptableValue('b').compare(new ScriptableValue(null)).value(),
      ).toThrow('Cannot invoke compare() with null argument.')
    })
    it('throws error comparing null', () => {
      expect(() =>
        new ScriptableValue(null).compare(new ScriptableValue(null)).value(),
      ).toThrow('Cannot invoke compare() with null argument.')
      expect(() =>
        new ScriptableValue(null).compare(new ScriptableValue('a')).value(),
      ).toThrow('Cannot invoke compare() with null argument.')
    })
  })

  describe('compareNoCase', () => {
    it('compares strings', () => {
      expect(
        new ScriptableValue('TextVarOne')
          .compareNoCase(new ScriptableValue('TextVarTwo'))
          .value(),
      ).toBe(-1)
      expect(
        new ScriptableValue('TextVarOne')
          .compareNoCase(new ScriptableValue('textVAROne'))
          .value(),
      ).toBe(0)
      expect(
        new ScriptableValue('b')
          .compareNoCase(new ScriptableValue('B'))
          .value(),
      ).toBe(0)
      expect(
        new ScriptableValue('b')
          .compareNoCase(new ScriptableValue('A'))
          .value(),
      ).toBe(1)
      expect(
        new ScriptableValue('B')
          .compareNoCase(new ScriptableValue('c'))
          .value(),
      ).toBe(-1)
      expect(() =>
        new ScriptableValue('b')
          .compareNoCase(new ScriptableValue(null))
          .value(),
      ).toThrow('Cannot invoke compareNoCase() with null argument.')
    })
    it('throws error comparing null', () => {
      expect(() =>
        new ScriptableValue(null)
          .compareNoCase(new ScriptableValue(null))
          .value(),
      ).toThrow('Cannot invoke compareNoCase() with null argument.')
      expect(() =>
        new ScriptableValue(null)
          .compareNoCase(new ScriptableValue('a'))
          .value(),
      ).toThrow('Cannot invoke compareNoCase() with null argument.')
    })
  })
})
