/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

const Save = ( props ) => {
	const locationFields = props.attributes.locations.map( ( location, index ) => {
		return <p key={ index }>{ location.address }</p>;
	} );

	return (
		<div className={ props.className }>
			<h2>Block</h2>
			{ locationFields }
		</div>
	);
};

export default Save;