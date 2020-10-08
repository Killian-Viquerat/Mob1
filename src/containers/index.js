import {useUserContainer} from './userContainer';
import {useBasketContainer} from './basketContainer';
import {createContainer} from 'unstated-next';

export const UserContainer = createContainer(useUserContainer);
export const BasketContainer = createContainer(useBasketContainer);
