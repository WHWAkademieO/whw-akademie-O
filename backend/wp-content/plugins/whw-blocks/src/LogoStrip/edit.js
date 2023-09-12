/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import {
	RichText,
	MediaUpload,
	BlockControls,
	AlignmentToolbar,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	Button,
	Panel,
	PanelHeader,
	PanelBody,
	PanelRow,
	ToggleControl,
	TextControl,
} from "@wordpress/components";
import React, { useEffect, useState } from "react";
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const blockProps = useBlockProps();
	const {
		className,
		isSelected,
		attributes: { facebookLink, instagramLink, title },
		setAttributes,
	} = props;
	useEffect(() => {
		// console.log(props);
	});
	const onChangeTitle = (value) => {
		setAttributes({ title: value });
	};
	const onChangeLinkFacebook = (value) => {
		setAttributes({ facebookLink: value });
	};
	const onChangeInstagram = (value) => {
		setAttributes({ instagramLink: value });
	};
	return (
		<div {...blockProps}>
			<Panel header="Logo Strip block">
				<PanelBody title=" " initialOpen={false}>
					<div className="container flex">
						<TextControl value={title} onChange={onChangeTitle} label="title" />
						<TextControl
							value={facebookLink}
							onChange={onChangeLinkFacebook}
							label="facebook"
						/>
						<TextControl
							value={instagramLink}
							onChange={onChangeInstagram}
							label="instagram"
						/>
					</div>
				</PanelBody>
			</Panel>
		</div>
	);
}
