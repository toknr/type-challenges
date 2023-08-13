import type { Equal, Expect } from "@type-challenges/utils"

const tuple = ["tesla", "model 3", "model X", "model Y"] as const
const tupleNumber = [1, 2, 3, 4] as const
const tupleMix = [1, "2", 3, "4"] as const

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: "tesla"
        "model 3": "model 3"
        "model X": "model X"
        "model Y": "model Y"
      }
    >
  >,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<
    Equal<TupleToObject<typeof tupleMix>, { 1: 1; "2": "2"; 3: 3; "4": "4" }>
  >
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>

type TupleToObject<T extends readonly (string | number)[]> = {
  [P in T[number]]: P
}

// MappedType
// inにより反復処理が可能。(fot...in)のようなイメージ
// 基本形 {[P in K]: T}
// P: パラメータ
// K: 制約型(string | number | symbol)
// T: 付与される型

// Index Access Types
// T[number]により、indexアクセスが可能
