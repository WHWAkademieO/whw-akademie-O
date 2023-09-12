/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import {
	RichText,
	__experimentalLinkControl as LinkControl,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	Button,
	Panel,
	PanelHeader,
	PanelBody,
	PanelRow,
	ToggleControl,
	ColorPicker,
	ColorPalette,
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
		attributes: { title, content, dot, listCta },
		setAttributes,
	} = props;
	const [items, setItems] = React.useState(listCta || []);

	const colors = [
		{ name: "yellow", color: "rgb(198, 210, 2)" },
		{ name: "light-green", color: "rgb(60, 170, 55)" },
		{ name: "bold-green", color: "rgb(0, 113, 57)" },
		{ name: "black", color: "rgb(0, 0, 0)" },
	];

	const onChangeTitle = (value) => {
		setAttributes({ title: value });
	};

	const onChangeDotAppearance = (value) => {
		setAttributes({ dot: value });
	};

	const handleChangeListCta = useCallback(() => {
		setAttributes({ listCta: [...(listCta || []), {}] });
		setItems([...items, {}]);
	}, [items, setAttributes]);

	const handleDeleteCta = useCallback(
		(key) => {
			let currentCta = [...items];
			currentCta = currentCta.filter((_, index) => index !== key);
			setItems(currentCta);
			setAttributes({ listCta: currentCta });
		},
		[items, setAttributes]
	);

	const handleUpdateListCta = useCallback(
		(key, value, index) => {
			const currentList = [...items];
			currentList[index][key] = value;
			setItems(currentList);
			setAttributes({ listCta: currentList });
		},
		[items, props.attributes, setAttributes]
	);

	return (
		<div {...blockProps}>
			<Panel header="Text CTA block">
				<PanelBody title=" " initialOpen={false}>
					<div className="hero-wrapper" key="container">
						<div className="hero-text">
							<label>Title: </label>
							<RichText
								tagName="p"
								className="callout-title"
								placeholder={__("Write a title…")}
								value={title}
								onChange={onChangeTitle}
							/>
						</div>
						<div>
							<label>Content: </label>
							<RichText
								tagName="p"
								className="callout-content"
								placeholder={__("Type content here ...")}
								value={content}
								onChange={(value) => setAttributes({ content: value })}
							/>
						</div>
						<div>
							<ToggleControl
								className="custom-toogle"
								label="Show dot"
								checked={dot}
								onChange={onChangeDotAppearance}
							/>
						</div>
						<div>
							<label>Repeat CTA:</label>
							{items?.length > 0 ? (
								<List
									values={items || []}
									onChange={({ oldIndex, newIndex }) => {
										setItems(arrayMove(items, oldIndex, newIndex));
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
														style={{
															color: "red",
															border: "none",
															background: "white",
															cursor: "pointer",
														}}
														onClick={(e) => {
															e.stopPropagation();
															handleDeleteCta(props.key);
														}}
													>
														Remove
													</button>
												</div>
												<div>
													<label>Title:</label>
													<TextControl
														placeholder="Type your cta label here"
														value={value?.title}
														onChange={(value) =>
															handleUpdateListCta("title", value, props.key)
														}
													/>
												</div>
												<div className="color-editor">
													<div>
														<label>Background:</label>
														<ColorPalette
															colors={colors}
															value={value?.background}
															enableAlpha
															onChange={(val) => {
																handleUpdateListCta(
																	"background",
																	val,
																	props.key
																);
															}}
															// defaultValue="#FFF"
														/>
													</div>
													<div>
														<label>Text color:</label>
														<ColorPalette
															colors={colors}
															enableAlpha
															value={value?.textColor}
															onChange={(val) =>
																handleUpdateListCta("textColor", val, props.key)
															}
															// defaultValue="#FFF"
														/>
													</div>
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
														onChange={(href) => {
															handleUpdateListCta(
																"href",
																{ ...href, title: href?.url },
																props.key
															);
															// handleUpdateListCta("href", href, props.key);
														}}
														withCreateSuggestion={true}
														createSuggestionButtonText={(newValue) =>
															`${"New:"} ${newValue}`
														}
													></LinkControl>
												</div>
											</li>
										);
									}}
								/>
							) : (
								<h4>Click button below to create more CTA</h4>
							)}
							<Button variant={"primary"} onClick={handleChangeListCta}>
								Add CTA
							</Button>
						</div>
					</div>
				</PanelBody>
			</Panel>
		</div>
	);
}
