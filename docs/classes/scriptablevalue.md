**[MOLGENIS Magma](../README.md)**

> [Globals](../README.md) / ScriptableValue

# Class: ScriptableValue

## Hierarchy

* **ScriptableValue**

## Index

### Constructors

* [constructor](scriptablevalue.md#constructor)

### Properties

* [unit](scriptablevalue.md#unit)
* [val](scriptablevalue.md#val)

### Methods

* [abs](scriptablevalue.md#abs)
* [age](scriptablevalue.md#age)
* [all](scriptablevalue.md#all)
* [any](scriptablevalue.md#any)
* [compare](scriptablevalue.md#compare)
* [compareNoCase](scriptablevalue.md#comparenocase)
* [contains](scriptablevalue.md#contains)
* [div](scriptablevalue.md#div)
* [indexOf](scriptablevalue.md#indexof)
* [lastIndexOf](scriptablevalue.md#lastindexof)
* [matches](scriptablevalue.md#matches)
* [minus](scriptablevalue.md#minus)
* [not](scriptablevalue.md#not)
* [plus](scriptablevalue.md#plus)
* [pow](scriptablevalue.md#pow)
* [round](scriptablevalue.md#round)
* [times](scriptablevalue.md#times)
* [value](scriptablevalue.md#value)

## Constructors

### constructor

\+ **new ScriptableValue**(`value`: [Value](../README.md#value) \| null): [ScriptableValue](scriptablevalue.md)

*Defined in [ScriptableValue.ts:52](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L52)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | [Value](../README.md#value) \| null |

**Returns:** [ScriptableValue](scriptablevalue.md)

## Properties

### unit

•  **unit**: null

*Defined in [ScriptableValue.ts:52](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L52)*

___

### val

•  **val**: [Value](../README.md#value) \| null

*Defined in [ScriptableValue.ts:51](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L51)*

## Methods

### abs

▸ **abs**(): [ScriptableValue](scriptablevalue.md)

*Defined in [ScriptableValue.ts:63](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L63)*

**Returns:** [ScriptableValue](scriptablevalue.md)

___

### age

▸ **age**(): [ScriptableValue](scriptablevalue.md)

*Defined in [ScriptableValue.ts:71](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L71)*

**Returns:** [ScriptableValue](scriptablevalue.md)

___

### all

▸ **all**(...`args`: ([Value](../README.md#value) \| [ScriptableValue](scriptablevalue.md))[]): [ScriptableValue](scriptablevalue.md)

*Defined in [ScriptableValue.ts:171](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L171)*

**`example`** <caption>Check that both values are present</caption>
`$('Categorical').all('CAT1', 'CAT2')`

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`...args` | ([Value](../README.md#value) \| [ScriptableValue](scriptablevalue.md))[] | the value or values to match |

**Returns:** [ScriptableValue](scriptablevalue.md)

true when the value contains all specified parameters, false otherwise.
Note that this method will always return false if the value is null.

___

### any

▸ **any**(...`args`: ((value: [ScriptableValue](scriptablevalue.md),index?: undefined \| number) => [ScriptableValue](scriptablevalue.md) \| [Value](../README.md#value))[]): [ScriptableValue](scriptablevalue.md)

*Defined in [ScriptableValue.ts:131](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L131)*

**`example`** 
$('Categorical').any('CAT1', 'CAT2')

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`...args` | ((value: [ScriptableValue](scriptablevalue.md),index?: undefined \| number) => [ScriptableValue](scriptablevalue.md) \| [Value](../README.md#value))[] | one or more values or predicate functions to match |

**Returns:** [ScriptableValue](scriptablevalue.md)

true when the value is equal to any of the parameter, false otherwise. Note that this method will always
return false if the value is null.

___

### compare

▸ **compare**(`other`: [ScriptableValue](scriptablevalue.md)): [ScriptableValue](scriptablevalue.md)

*Defined in [ScriptableValue.ts:245](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L245)*

When comparing Boolean values:
* returns 0 if the value represents the same boolean value as the argument;
* a positive integer if the value represents true and the argument represents false;
* and a negative integer if this value represents false and the argument represents true.

When comparing Numeric values (i.e. integer and/or decimal types) or Text values:
returns a negative integer, zero, or a positive integer as the value is less than,
equal to, or greater than the value argument.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`other` | [ScriptableValue](scriptablevalue.md) | the value to compare to  |

**Returns:** [ScriptableValue](scriptablevalue.md)

___

### compareNoCase

▸ **compareNoCase**(`other`: [ScriptableValue](scriptablevalue.md)): [ScriptableValue](scriptablevalue.md)

*Defined in [ScriptableValue.ts:292](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L292)*

Returns a new [ScriptableValue](scriptablevalue.md) of the {@link number} indicating
if the first parameter is greater than, equal to, or less than the second
parameter. Both parameters must have a value of string type.
Case is ignored.
Zero (0) is returned if the values are equal.
A number greater than zero (1) is returned if the first parameter is
greater than the second. A number less than zero (-1) is returned is
the first parameter is less than the second.
<pre>
  $('TextVarOne').compareNoCase($('TextVarTwo'))
</pre>

**`throws`** Error if operands are not ScriptableValue Objects of TextType.
Also thrown if operands are null.

#### Parameters:

Name | Type |
------ | ------ |
`other` | [ScriptableValue](scriptablevalue.md) |

**Returns:** [ScriptableValue](scriptablevalue.md)

___

### contains

▸ **contains**(`other`: [Value](../README.md#value) \| null): boolean

*Defined in [ScriptableValue.ts:98](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L98)*

#### Parameters:

Name | Type |
------ | ------ |
`other` | [Value](../README.md#value) \| null |

**Returns:** boolean

___

### div

▸ **div**(`other`: unknown): [ScriptableValue](scriptablevalue.md)

*Defined in [ScriptableValue.ts:90](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L90)*

#### Parameters:

Name | Type |
------ | ------ |
`other` | unknown |

**Returns:** [ScriptableValue](scriptablevalue.md)

___

### indexOf

▸ **indexOf**(`other`: [Value](../README.md#value) \| null): number

*Defined in [ScriptableValue.ts:104](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L104)*

#### Parameters:

Name | Type |
------ | ------ |
`other` | [Value](../README.md#value) \| null |

**Returns:** number

___

### lastIndexOf

▸ **lastIndexOf**(`other`: [Value](../README.md#value) \| null): number

*Defined in [ScriptableValue.ts:114](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L114)*

#### Parameters:

Name | Type |
------ | ------ |
`other` | [Value](../README.md#value) \| null |

**Returns:** number

___

### matches

▸ **matches**(`regex`: unknown): [ScriptableValue](scriptablevalue.md)

*Defined in [ScriptableValue.ts:319](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L319)*

#### Parameters:

Name | Type |
------ | ------ |
`regex` | unknown |

**Returns:** [ScriptableValue](scriptablevalue.md)

___

### minus

▸ **minus**(`other`: unknown): [ScriptableValue](scriptablevalue.md)

*Defined in [ScriptableValue.ts:82](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L82)*

#### Parameters:

Name | Type |
------ | ------ |
`other` | unknown |

**Returns:** [ScriptableValue](scriptablevalue.md)

___

### not

▸ **not**(...`args`: [Value](../README.md#value)[]): [ScriptableValue](scriptablevalue.md)

*Defined in [ScriptableValue.ts:203](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L203)*

Without arguments, must be applied to boolean values only.
With arguments, should be considered as a 'not equals'
comparison test.

**`example`** 
$('BooleanVar').not()

**`example`** 
$('Categorical').any('CAT1').not()

**`example`** 
$('Categorical').not('CAT1', 'CAT2')

**`example`** 
$('Categorical').not($('Other Categorical'))

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`...args` | [Value](../README.md#value)[] | optional values that should not match |

**Returns:** [ScriptableValue](scriptablevalue.md)

___

### plus

▸ **plus**(`other`: unknown): [ScriptableValue](scriptablevalue.md)

*Defined in [ScriptableValue.ts:78](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L78)*

#### Parameters:

Name | Type |
------ | ------ |
`other` | unknown |

**Returns:** [ScriptableValue](scriptablevalue.md)

___

### pow

▸ **pow**(`other`: unknown): [ScriptableValue](scriptablevalue.md)

*Defined in [ScriptableValue.ts:94](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L94)*

#### Parameters:

Name | Type |
------ | ------ |
`other` | unknown |

**Returns:** [ScriptableValue](scriptablevalue.md)

___

### round

▸ **round**(): [ScriptableValue](scriptablevalue.md)

*Defined in [ScriptableValue.ts:67](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L67)*

**Returns:** [ScriptableValue](scriptablevalue.md)

___

### times

▸ **times**(`other`: unknown): [ScriptableValue](scriptablevalue.md)

*Defined in [ScriptableValue.ts:86](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L86)*

#### Parameters:

Name | Type |
------ | ------ |
`other` | unknown |

**Returns:** [ScriptableValue](scriptablevalue.md)

___

### value

▸ **value**(): [Value](../README.md#value) \| null

*Defined in [ScriptableValue.ts:58](https://github.com/fdlk/molgenis-js-magma/blob/e3e3a86/src/ScriptableValue.ts#L58)*

**Returns:** [Value](../README.md#value) \| null
