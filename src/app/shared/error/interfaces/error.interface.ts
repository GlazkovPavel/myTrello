import {ErrorMethods} from '../enum/error-methods.enum';
import {ErrorPlaces} from '../enum/error-places.enum';

export interface IError {
	err?: any;
	method?: ErrorMethods;
	place?: ErrorPlaces;
	canceled?: boolean;
	code?: string;
	messages?: string;
	description?: string;
}
