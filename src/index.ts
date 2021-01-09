import ScriptableValue, { Value } from './ScriptableValue'

export function $(
  this: { [key: string]: Value },
  attrName: string,
): ScriptableValue {
  if (!(attrName in this)) {
    throw `Unknown attribute '${attrName}'`
  }
  return new ScriptableValue(this[attrName])
}

export function newValue(value: Value): ScriptableValue {
  return new ScriptableValue(value)
}
