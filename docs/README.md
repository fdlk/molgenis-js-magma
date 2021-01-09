**[MOLGENIS Magma](README.md)**

> Globals

# MOLGENIS Magma

## Index

### Classes

* [ScriptableValue](classes/scriptablevalue.md)

### Type aliases

* [Entity](README.md#entity)
* [IDValueType](README.md#idvaluetype)
* [Value](README.md#value)

### Functions

* [$](README.md#$)
* [\_isNull](README.md#_isnull)
* [newValue](README.md#newvalue)

## Type aliases

### Entity

Ƭ  **Entity**: { _idValue: number \| string  }

*Defined in [ScriptableValue.ts:1](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L1)*

#### Type declaration:

Name | Type |
------ | ------ |
`\_idValue` | number \| string |

___

### IDValueType

Ƭ  **IDValueType**: number \| string \| Date

*Defined in [ScriptableValue.ts:2](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L2)*

___

### Value

Ƭ  **Value**: [IDValueType](README.md#idvaluetype) \| boolean \| [Entity](README.md#entity) \| [Value](README.md#value)[]

*Defined in [ScriptableValue.ts:3](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L3)*

## Functions

### $

▸ **$**(`this`: { [key:string]: [Value](README.md#value);  }, `attrName`: string): [ScriptableValue](classes/scriptablevalue.md)

*Defined in [index.ts:3](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/index.ts#L3)*

#### Parameters:

Name | Type |
------ | ------ |
`this` | { [key:string]: [Value](README.md#value);  } |
`attrName` | string |

**Returns:** [ScriptableValue](classes/scriptablevalue.md)

___

### \_isNull

▸ **_isNull**(`value`: unknown): boolean

*Defined in [ScriptableValue.ts:5](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | unknown |

**Returns:** boolean

___

### newValue

▸ **newValue**(`value`: [Value](README.md#value)): [ScriptableValue](classes/scriptablevalue.md)

*Defined in [index.ts:13](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/index.ts#L13)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | [Value](README.md#value) |

**Returns:** [ScriptableValue](classes/scriptablevalue.md)
