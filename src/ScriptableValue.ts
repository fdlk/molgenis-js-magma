export type Entity = { _idValue: number | string }
export type IDValueType = number | string | Date
export type Value = IDValueType | boolean | Entity | Value[]

export function _isNull(value: unknown): boolean {
  if (value === undefined) {
    throw new Error('value is not defined')
  }
  if (value instanceof ScriptableValue) {
    value = value.value()
  }
  return value === null || (typeof value === 'string' && value.length === 0)
}

/**
 * @private
 */
function unaryNumberOperation(
  x: ScriptableValue,
  op: (arg: number) => number,
): ScriptableValue {
  const value = x.value()
  if (typeof value === 'number') {
    return new ScriptableValue(op(value))
  }
  return new ScriptableValue(null)
}

/**
 * @private
 */
function binaryNumberOperation(
  x: ScriptableValue,
  y: unknown,
  op: (arg1: number, arg2: number) => number,
): ScriptableValue {
  if (y === undefined) {
    throw new Error('argument is undefined')
  }
  if (y instanceof ScriptableValue) {
    y = y.value()
  }
  const xval = x.value()
  if (typeof xval === 'number' && typeof y === 'number') {
    return new ScriptableValue(op(xval, y))
  }
  return new ScriptableValue(null)
}

export default class ScriptableValue {
  val: Value | null
  unit: null

  constructor(value: Value | null) {
    this.val = value
  }

  value(): Value | null {
    return this.val
  }

  // Unary number operations
  abs(): ScriptableValue {
    return unaryNumberOperation(this, Math.abs)
  }

  round(): ScriptableValue {
    return unaryNumberOperation(this, Math.round)
  }

  age(): ScriptableValue {
    return unaryNumberOperation(this, (x) =>
      Math.floor((Date.now() - x) / (365.2425 * 24 * 60 * 60 * 1000)),
    )
  }

  // Binary number operations
  plus(other: unknown): ScriptableValue {
    return binaryNumberOperation(this, other, (x, y) => x + y)
  }

  minus(other: unknown): ScriptableValue {
    return binaryNumberOperation(this, other, (x, y) => x - y)
  }

  times(other: unknown): ScriptableValue {
    return binaryNumberOperation(this, other, (x, y) => x * y)
  }

  div(other: unknown): ScriptableValue {
    return binaryNumberOperation(this, other, (x, y) => x / y)
  }

  pow(other: unknown): ScriptableValue {
    return binaryNumberOperation(this, other, Math.pow)
  }

  contains(other: Value | null): boolean {
    return Array.isArray(this.val)
      ? other !== null && this.val.includes(other)
      : this.val === other
  }

  indexOf(other: Value | null): number {
    return Array.isArray(this.val)
      ? other === null
        ? -1
        : this.val.indexOf(other)
      : this.val === other
      ? 0
      : -1
  }

  lastIndexOf(other: Value | null): number {
    return Array.isArray(this.val)
      ? other === null
        ? -1
        : this.val.lastIndexOf(other)
      : this.val === other
      ? 0
      : -1
  }

  /**
   * @param args one or more values or predicate functions to match
   * @example
   * $('Categorical').any('CAT1', 'CAT2')
   * @return true when the value is equal to any of the parameter, false otherwise. Note that this method will always
   * return false if the value is null.
   */
  any(
    ...args: (
      | ((value: ScriptableValue, index?: number) => ScriptableValue)
      | Value
    )[]
  ): ScriptableValue {
    if (this.val === null) {
      return new ScriptableValue(false)
    }
    for (const test of args) {
      if (typeof test === 'function') {
        if (Array.isArray(this.val)) {
          const matches = this.val
            .map((x) => new ScriptableValue(x))
            .map(test)
            .map((x) => (x instanceof ScriptableValue ? x.value() : x))
            .filter((x) => x !== null)
            .filter((x) => typeof x === 'boolean')
            .some((x) => x)
          if (matches) {
            return new ScriptableValue(true)
          }
        }
      } else {
        if (this.contains(test)) {
          return new ScriptableValue(true)
        }
      }
    }
    return new ScriptableValue(false)
  }

  /**
   * @param args the value or values to match
   * @example <caption>Check that both values are present</caption>
   * `$('Categorical').all('CAT1', 'CAT2')`
   *
   * @return true when the value contains all specified parameters, false otherwise.
   * Note that this method will always return false if the value is null.
   */
  all(...args: (Value | ScriptableValue)[]): ScriptableValue {
    if (this.value() === null) {
      return new ScriptableValue(false)
    }
    for (let test of args) {
      if (test instanceof ScriptableValue) {
        if (test === null || test.value() === null) {
          return new ScriptableValue(false)
        }
        test = test.value() as Value
      }
      if (!this.contains(test)) {
        return new ScriptableValue(false)
      }
    }
    return new ScriptableValue(true)
  }

  /**
   * Without arguments, must be applied to boolean values only.
   * With arguments, should be considered as a 'not equals'
   * comparison test.
   * @param args optional values that should not match
   * @example
   * $('BooleanVar').not()
   * @example
   * $('Categorical').any('CAT1').not()
   * @example
   * $('Categorical').not('CAT1', 'CAT2')
   * @example
   * $('Categorical').not($('Other Categorical'))
   */
  not(...args: Value[]): ScriptableValue {
    const _not = (x: Value | null): Value => {
      if (Array.isArray(x)) {
        return x.map((elt) => _not(elt))
      }
      if (typeof x !== 'boolean') {
        throw new Error(`cannot invoke not() for value of type ${typeof x}`)
      }
      return !x
    }

    if (args && args.length > 0) {
      for (let test of args) {
        if (test instanceof ScriptableValue) {
          if (test === null || test.value() === null) {
            if (this.val === null) {
              return new ScriptableValue(false)
            }
          }
          test = test.value() as Value
        }
        if (this.contains(test)) {
          return new ScriptableValue(false)
        }
      }
      return new ScriptableValue(true)
    } else {
      return new ScriptableValue(_not(this.value()))
    }
  }

  /**
   * When comparing Boolean values:
   * * returns 0 if the value represents the same boolean value as the argument;
   * * a positive integer if the value represents true and the argument represents false;
   * * and a negative integer if this value represents false and the argument represents true.
   *
   * When comparing Numeric values (i.e. integer and/or decimal types) or Text values:
   * returns a negative integer, zero, or a positive integer as the value is less than,
   * equal to, or greater than the value argument.
   *
   * @param other the value to compare to
   */
  compare(other: ScriptableValue): ScriptableValue {
    if (this.val === null) {
      throw new Error('Cannot invoke compare() with null argument.')
    }
    if (!(other instanceof ScriptableValue)) {
      throw new Error(
        'Cannot invoke compare() with argument that is not a ScriptableValue.',
      )
    }
    const otherValue = other.value()
    if (otherValue === null) {
      throw new Error('Cannot invoke compare() with null argument.')
    }
    if (this.val === otherValue) {
      return new ScriptableValue(0)
    }
    if (typeof this.val === 'number' && typeof otherValue === 'number') {
      return new ScriptableValue(this.val > otherValue ? 1 : -1)
    }
    if (typeof this.val === 'string' && typeof otherValue === 'string') {
      return new ScriptableValue(this.val > otherValue ? 1 : -1)
    }
    if (typeof this.val === 'boolean' && typeof otherValue === 'boolean') {
      return new ScriptableValue(this.val ? 1 : -1)
    }
    throw new Error(
      `Cannot invoke compare() with arguments of type '${typeof this
        .val}' and '${typeof other}'`,
    )
  }

  /**
   * Returns a new {@link ScriptableValue} of the {@link number} indicating
   * if the first parameter is greater than, equal to, or less than the second
   * parameter. Both parameters must have a value of string type.
   * Case is ignored.
   * Zero (0) is returned if the values are equal.
   * A number greater than zero (1) is returned if the first parameter is
   * greater than the second. A number less than zero (-1) is returned is
   * the first parameter is less than the second.
   * <pre>
   *   $('TextVarOne').compareNoCase($('TextVarTwo'))
   * </pre>
   *
   * @throws Error if operands are not ScriptableValue Objects of TextType.
   * Also thrown if operands are null.
   */
  compareNoCase(other: ScriptableValue): ScriptableValue {
    if (this.val === null) {
      throw new Error('Cannot invoke compareNoCase() with null argument.')
    }
    if (!(other instanceof ScriptableValue)) {
      throw new Error(
        'Cannot invoke compareNoCase() with argument that is not a ScriptableValue.',
      )
    }
    const otherValue = other.value()
    if (otherValue === null) {
      throw new Error('Cannot invoke compareNoCase() with null argument.')
    }
    if (!(typeof this.val === 'string' && typeof otherValue === 'string')) {
      throw new Error(
        `Cannot invoke compareNoCase() with arguments of type '${typeof this
          .val}' and '${typeof otherValue}'. Use type 'string' only.`,
      )
    }
    const x = this.val.toUpperCase().toLowerCase()
    const y = otherValue.toUpperCase().toLowerCase()
    if (x === y) {
      return new ScriptableValue(0)
    }
    return new ScriptableValue(x > y ? 1 : -1)
  }

  matches(regex: unknown): ScriptableValue {
    if (regex instanceof ScriptableValue) {
      regex = regex.value()
    }
    if (typeof this.val === 'string' && regex instanceof RegExp) {
      return new ScriptableValue(regex.test(this.val))
    }
    return new ScriptableValue(null)
  }
}
