import { ActionType } from '../reducers/actions';
import { Feature, FeaturesHelper, IAsanyEditor } from '../typings';

export default class FeaturesHelperImpl implements FeaturesHelper {
  private editor: IAsanyEditor;
  constructor(editor: IAsanyEditor) {
    this.editor = editor;
  }
  has(feature: Feature): boolean {
    return (this.editor.state.features as any)[feature as string];
  }
  zoom(enable: boolean) {
    this.editor.store.dispatch({
      type: ActionType.FeatureZoom,
      payload: enable,
    });
  }
  drag(enable: boolean): void {
    this.editor.store.dispatch({
      type: ActionType.FeatureDrag,
      payload: enable,
    });
  }
  selecto(enable: boolean) {
    this.editor.store.dispatch({
      type: ActionType.FeatureSelecto,
      payload: enable,
    });
  }
  ruler(enable: boolean) {
    this.editor.store.dispatch({
      type: ActionType.FeatureRuler,
      payload: enable,
    });
  }
}
