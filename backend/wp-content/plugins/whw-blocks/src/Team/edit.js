/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import {
	RichText,
	__experimentalLinkControl as LinkControl,
	InnerBlocks,
	useBlockProps,
	MediaUpload,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	Button,
	Panel,
	PanelHeader,
	PanelBody,
	PanelRow,
	ToggleControl,
	ColorPicker,
	TextControl,
} from "@wordpress/components";
import { List, arrayMove } from "react-movable";

import React, { useCallback } from "react";
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
		attributes: { teams },
		setAttributes,
	} = props;

	const handleAddMember = useCallback(() => {
		props.setAttributes({ teams: [...(props.attributes?.teams || []), {}] });
	}, [props.attributes, setAttributes]);

	const handleDeleteMember = useCallback(
		(key) => {
			let currentMember = [...props?.attributes?.teams];
			currentMember = currentMember.filter((_, index) => index !== key);
			setAttributes({ teams: currentMember });
		},
		[props.attributes, setAttributes]
	);

	const handleUpdateListTeam = useCallback(
		(key, value, index) => {
			const currentList = [...props.attributes?.teams];
			currentList[index][key] = value;
			// setItems(currentList);
			setAttributes({ teams: currentList });
		},
		[props.attributes, setAttributes]
	);

	return (
		<div {...blockProps}>
			<Panel header="Team block">
				<PanelBody title=" " initialOpen={false}>
					{/* <div key="container">
						<InnerBlocks
							templateLock
							onChange={onChangeHandler}
							template={[["core/gallery", {}]]}
						/>
					</div> */}
					{/* <div {...{ ...innerBlocksProps, onChange: onChangeHandler }}></div> */}
					<label>Team member:</label>
					{teams?.length > 0 ? (
						<List
							values={teams || []}
							onChange={({ oldIndex, newIndex }) => {
								props.setAttributes({
									teams: arrayMove(props?.attributes, oldIndex, newIndex),
								});
							}}
							renderList={({ children, props }) => (
								<ul style={{ padding: 0 }} {...props}>
									{children}
								</ul>
							)}
							renderItem={({ value, props }) => {
								return (
									<li className="drag-item" {...props}>
										<div className="repater-close-icon">
											<button
												style={{ color: "red", border: "none", background: "white", cursor: "pointer" }}
												onClick={(e) => {
													e.stopPropagation();
													handleDeleteMember(props.key);
												}}
											>
												Remove
											</button>
										</div>
										<div>
											<label>Member name:</label>
											<TextControl
												placeholder="Type your cta label here"
												value={value?.name}
												onChange={(value) =>
													handleUpdateListTeam("name", value, props.key)
												}
											/>
										</div>
										<div>
											<label>Link control:</label>
											<LinkControl
												searchInputPlaceholder="Search here..."
												value={value?.href}
												settings={
													[
														// {
														// 	id: "opensInNewTab",
														// 	title: "New tab?",
														// },
														// {
														// 	id: "customDifferentSetting",
														// 	title: "Has this custom setting?",
														// },
													]
												}
												onChange={(href) =>
													handleUpdateListTeam(
														"href",
														{ ...href, title: href?.url },
														props.key
													)
												}
												withCreateSuggestion={true}
												createSuggestionButtonText={(newValue) =>
													`${"New:"} ${newValue}`
												}
											></LinkControl>
										</div>
										<div>
											<div>
												<label>Avatar:</label> <br />
												<MediaUpload
													// multiple={true}
													gallery={true}
													onSelect={(e) => {
														handleUpdateListTeam("avatar", e, props.key);
													}}
													render={({ open }) => {
														return value?.avatar?.url ? (
															<div className="image_grid">
																<button onClick={open}>
																	<img
																		style={{ width: "100%", height: "100%" }}
																		src={value?.avatar?.url}
																		alt={value?.avatar?.alt}
																	/>
																</button>
															</div>
														) : (
															<Button variant="primary" onClick={open}>
																Upload Image
															</Button>
														);
													}}
												/>
											</div>
										</div>
									</li>
								);
							}}
						/>
					) : (
						<h4>Click button bellow too add member</h4>
					)}
					<Button variant={"primary"} onClick={handleAddMember}>
						Add member
					</Button>
				</PanelBody>
			</Panel>
		</div>
	);
}
