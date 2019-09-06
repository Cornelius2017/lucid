import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CloseIcon');

interface ICloseIconProps extends IIconProps {}

const CloseIcon: FC<ICloseIconProps> = ({
	className,
	isDisabled,
	isClickable,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(CloseIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			isClickable={isClickable}
			isDisabled={isDisabled}
			className={cx(
				'&',
				isDisabled && '&-is-disabled',
				isClickable && '&-is-clickable',
				className
			)}
		>
			<path d='M.5.5l15 15m0-15l-15 15' />
		</Icon>
	);
};

CloseIcon.displayName = 'CloseIcon',
CloseIcon.peek = {
	description: `
		A larger close X icon
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
CloseIcon.propTypes = {
	...Icon.propTypes,
};

export default CloseIcon;