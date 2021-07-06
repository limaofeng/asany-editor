import { AsanyAction, AsanyProject, ProjectActionType } from '../typings';

export { ProjectActionType } from '../typings';

export interface IProjectState extends AsanyProject {}

export default function reducer(
  state: IProjectState,
  action: AsanyAction<ProjectActionType>
): IProjectState {
  if (ProjectActionType.ChangeCase === action.type) {
    return action.payload;
  }
  return state;
}
