import { autorun, observable, action } from 'mobx'
import { IComponent, IStorage, AnyDocument,
  ComponentExtensions } from '@respace/common'

export class Component<D extends AnyDocument, S>
implements IComponent<D, S> {
  @observable isActive = false
  @observable displayName: string
  @observable title: string
  @observable width = 0
  @observable height = 0
  container: HTMLElement

  constructor(
    public id: string,
    public name: string,
    title: string,
    displayName: string,
    public document: D,
    public store: S,
    public extensions: ComponentExtensions<D, S>
   ) {
    this.displayName = displayName
    this.title = title
  }

  async rehydrate(storage: IStorage) {
    const state = <this> (await storage.get('state'))
    if (state) {
      this.isActive = state.isActive || this.isActive
      this.title = state.title || this.title
      this.displayName = state.displayName || this.displayName
    }
    autorun(() => {
      this.save(storage)
    })
  }

  save(storage: IStorage) {
    storage.put('state', {
      title: this.title,
      displayName: this.displayName,
      isActive: this.isActive
    })
  }

  @action('updateSize')
  updateSize() {
    if (this.container) {
      this.width = this.container.offsetWidth
      this.height = this.container.offsetHeight
    }
  }
}
