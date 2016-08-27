import * as rs from '@respace/common'
import { observable, action, computed } from 'mobx'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/debounceTime'

export type Document = rs.IComponentProps<rs.Annotations, void>

class CommentStore {

  // User Data
  posterName = 'You'
  profileUrl = ''
  posterRole = 'student'
  profilePicture: ''

  @observable newAnnotationValue = ''
  @observable isEditMode = true

  private _editor: AceAjax.Editor
  private change$: Subject<string> = new Subject<string>()

  constructor(private annotations: rs.Annotations) {
    this.change$.debounceTime(10).subscribe((value) => {
      this.newAnnotationValue = value
    })
  }

  newCommentChange(value: string) {
    this.change$.next(value)
  }

  @computed get allAnnotations() {
    const annotations = this.annotations.all
      .sort((a, b) => (a.createdAt.valueOf()) - (b.createdAt.valueOf()))
    return annotations
  }

  @action('annotations.add')
  addAnnotation() {
    this.annotations.create(this.newAnnotationValue)
    this.newAnnotationValue = ''
    if (this._editor) {
      this._editor.setValue('')
    }
    this.isEditMode = true
  }

  setCommentEditor(editor: AceAjax.Editor) {
    editor.setOption('showGutter', false)
    editor.on('change', () => {
      this.newAnnotationValue = editor.getValue()
    })
    this._editor = editor
  }
}

export default CommentStore
