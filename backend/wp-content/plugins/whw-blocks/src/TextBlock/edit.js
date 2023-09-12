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
	HeadingLevelDropdown,
	BaseControl
} from "@wordpress/block-editor";
import {
	Button,
	Panel,
	PanelHeader,
	PanelBody,
	PanelRow,
	ToggleControl,
	SelectControl,
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
		attributes: { title, content, dot, level },
		setAttributes,
	} = props;
	const tagName = 'h' + level;
	const alignOptions = ["Select alignment","center","left","right"];

	const onChangeTitle = (value) => {
		setAttributes({ title: value });
	};

	const onChangeDotAppearance = (value) => {
		setAttributes({ dot: value });
	};

	return (
		<div {...blockProps}>
			<Panel header="Text block">
				<PanelBody title=" " initialOpen={false}>
					<div className="hero-wrapper" key="container">
						<div className="hero-text">
							{/* <label>Title:</label> */}
							<BlockControls group="inline">
								<HeadingLevelDropdown
									value={level}
									onChange={(newLevel) => setAttributes({ level: newLevel })}
								/>
							</BlockControls>
							<RichText
								tagName={tagName} 
								className="callout-title"
								placeholder={__("Write a title…")}
								value={title}
								onChange={onChangeTitle}
							/>
						</div>
						<div>
							{/* <label>Content:</label> */}
							<RichText
								tagName="p"
								className="callout-content"
								placeholder={__("Type content here ...")}
								value={content}
								onChange={(value) => setAttributes({ content: value })}
							/>
						</div>
						<div>
							<label>Alignment:</label>
							<SelectControl
								// style={{ padding: 0 }}
								className="custom-select"
								value={props?.attributes?.alignment}
								hasSelectAll={false}
								// value={this.state.users} // e.g: value = [ 'a', 'c' ]
								onChange={(alignment) => {
									// console.log(alignment)
									// this.setState({ users });
									setAttributes({
										alignment,
									});
								}}
								options={alignOptions.map((option) => ({
									value: option,
									label: option,
								}))}
								__nextHasNoMarginBottom
							/>
						</div>
						<div>
							<ToggleControl
								label="Show dot"
								checked={dot}
								onChange={onChangeDotAppearance}
							/>
						</div>
					</div>
				</PanelBody>
			</Panel>
		</div>
	);
}
