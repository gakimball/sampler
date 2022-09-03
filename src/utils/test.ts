import produce, { immerable } from 'immer';
import { WritableDraft } from 'immer/dist/internal';

type Updater = (this: WritableDraft<Thing>, ...args: any[]) => (Thing | void)

const action = (target: Thing, key: string | symbol, descriptor: TypedPropertyDescriptor<Updater>) => {
  const originalValue = descriptor.value

  descriptor.value = (...args) => produce(target, draft => originalValue?.apply(draft, args))
}

export class Thing {
  [immerable] = true

  value = 0

  @action
  update(this: WritableDraft<Thing>, value: number) {
    this.value = value
  }
}

const thing = new Thing()

thing.update(3)
