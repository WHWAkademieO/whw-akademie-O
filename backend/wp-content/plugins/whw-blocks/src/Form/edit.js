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
		attributes: { title, content, __typename },
		setAttributes,
	} = props;
	useEffect(() => {
		setAttributes({ __typename: "form" });
	});

	const onChangeTitle = (value) => {
		setAttributes({ title: value });
	};
	const onChangeContent = (value) => {
		setAttributes({ content: value });
	};
	return (
		<div {...blockProps}>
			<Panel header="Form">
				<PanelBody title=" ">
					<div className="hero-wrapper">
						<TextControl value={title} onChange={onChangeTitle} label="title" />

						<RichText
							className="content"
							tagName="p"
							allowedFormats={[
								"core/bold",
								"core/italic",
								"core/strikethrough",
							]}
							placeholder={"Content here..."}
							value={content}
							onChange={(val) => setAttributes({ content: val })}
						/>
						<p>Just add this block and the form will be displayed</p>
					</div>
				</PanelBody>
			</Panel>
		</div>
	);
}
