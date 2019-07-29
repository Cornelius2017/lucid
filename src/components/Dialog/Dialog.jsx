import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Overlay from '../Overlay/Overlay';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, omitProps } from '../../util/component-types';
import Button from '../Button/Button';
import CloseIcon from '../Icon/CloseIcon/CloseIcon';

const cx = lucidClassNames.bind('&-Dialog');

const { node, oneOf, bool, func } = PropTypes;

const SMALL = 'small';
const MEDIUM = 'medium';
const LARGE = 'large';

const Dialog = createClass({
	displayName: 'Dialog',

	statics: {
		peek: {
			description: `
				Dialog is used to pop open a window so the user doesn't lose the
				context of the page behind it. Extra props are spread through to the
				underlying \`Overlay\`
			`,
			categories: ['layout'],
			extend: 'Overlay',
			madeFrom: ['Portal', 'Overlay'],
		},
	},

	components: {
		Header: createClass({
			displayName: 'Dialog.Header',
			statics: {
				peek: {
					description: `
						Renders a \`<div>\`.
					`,
				},
			},
			propName: 'Header',
		}),
		Footer: createClass({
			displayName: 'Dialog.Footer',
			statics: {
				peek: {
					description: `
						Renders a \`<footer>\`.
					`,
				},
			},
			propName: 'Footer',
		}),
	},

	propTypes: {
		...Overlay.propTypes,

		size: oneOf(['small', 'medium', 'large'])`
			Size variations that only affect the width of the dialog. All the sizes
			will grow in height until they get too big, at which point they will
			scroll inside.
		`,

		handleClose: func`
			If this is truthy (if a function is provided). the close button will show.
			The function that is called when the close button is triggered.
		`,

		isComplex: bool`
			Defaults to false.
			Provides a more segregated design to organize more content in the Dialog.
		`,

		hasGutters: bool`
			A true or false value that dictates whether or not the Body has padding.
		`,

		Header: node`
			*Child Element* - Header contents. Only one \`Header\` is used.
		`,

		Footer: node`
			*Child Element* - Footer contents. Only one \`Footer\` is used.
		`,
	},

	getDefaultProps() {
		return {
			size: MEDIUM,
			isComplex: false,
			hasGutters: true,
		};
	},

	render() {
		const {
			className,
			size,
			handleClose,
			hasGutters,
			isShown,
			isComplex,
			...passThroughs
		} = this.props;

		const headerChildProp = _.get(
			getFirst(this.props, Dialog.Header),
			'props',
			{}
		);
		const footerChildProp = _.get(
			getFirst(this.props, Dialog.Footer),
			'props',
			null
		);

		return (
			<Overlay
				{...omitProps(passThroughs, Dialog, [], false)}
				{..._.pick(passThroughs, _.keys(Overlay.propTypes))}
				isShown={isShown}
				className={cx('&', className)}
			>
				<div
					className={cx('&-window', {
						'&-window-is-small': size === SMALL,
						'&-window-is-medium': size === MEDIUM,
						'&-window-is-large': size === LARGE,
						'&-is-complex': isComplex,
						'&-no-footer': !footerChildProp,
					})}
				>
					<header className={cx('&-header')}>
						{headerChildProp.children}

						{handleClose && (
							<Button
								kind='invisible'
								hasOnlyIcon
								className={cx('&-close-button')}
								onClick={handleClose}
							>
								<CloseIcon />
							</Button>
						)}
					</header>

					<section
						className={cx('&-body', hasGutters ? '' : '&-body-no-gutters')}
					>
						{this.props.children}
					</section>

					{footerChildProp && (
						<footer {...footerChildProp} className={cx('&-footer')} />
					)}
				</div>
			</Overlay>
		);
	},
});

export default Dialog;
