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
		attributes: { mediaID, mediaURL, body, alignment, title, height },
		setAttributes,
	} = props;
	useEffect(() => {
		// console.log(props);
	});
	const onChangeTitle = (value) => {
		setAttributes({ title: value });
	};
	const onChangeHeight = (value) => {
		setAttributes({ height: value });
	};
	const onSelectImage = (media) => {
		setAttributes({
			mediaURL: media.url,
			mediaID: media.id,
		});
	};
	return (
		<div {...blockProps}>
			{isSelected && (
				<BlockControls key="controls">
					<AlignmentToolbar
						value={alignment}
						onChange={(nextAlign) => {
							setAttributes({ alignment: nextAlign });
						}}
					/>
				</BlockControls>
			)}
			<Panel header="Hero block">
				<PanelBody title=" " initialOpen={false}>
					<div className="hero-wrapper" key="container">
						<div className="hero-text">
							<label>Title:</label>
							<RichText
								tagName="h2"
								className="callout-title"
								placeholder={__("Write a hero title…")}
								value={title}
								onChange={onChangeTitle}
							/>
						</div>

						<div>
							<label>Banner:</label>
							<MediaUpload
								onSelect={onSelectImage}
								type="image"
								value={mediaID}
								render={({ open }) => (
									<Button
										className={mediaID ? "image-button" : "button button-large"}
										onClick={open}
									>
										{!mediaID ? (
											__("Upload Hero Image")
										) : (
											<img
												src={mediaURL}
												style={{ width: "50%", marginTop: "20px" }}
											/>
										)}
									</Button>
								)}
							/>
						</div>
						<div>
							<ToggleControl
								label="Full height"
								checked={height}
								onChange={onChangeHeight}
							/>
						</div>
					</div>
				</PanelBody>
			</Panel>
		</div>
	);
}
