import type { AsanyAction, IProjectState } from '../typings';

import { ProjectActionType } from './actions';

export default function reducer(state: IProjectState, action: AsanyAction<ProjectActionType>): IProjectState {
  if (ProjectActionType.ChangeCase === action.type) {
    return action.payload;
  }
  return state;
}
